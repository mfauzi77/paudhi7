const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const pool = require('../dbPostgres');
const appSourceMiddleware = require('../middleware/appSource');
const crypto = require('crypto');

// Apply middleware to all AI routes
router.use(appSourceMiddleware);

// --- Enhanced In-Memory Cache with Cleanup ---
const requestCache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour (Reduced from 24h)
const MAX_CACHE_SIZE = 1000; 

const cleanupCache = () => {
    if (requestCache.size > MAX_CACHE_SIZE) {
        let removedCount = 0;
        const limit = MAX_CACHE_SIZE * 0.2;
        for (const [key, value] of requestCache.entries()) {
            if (Date.now() - value.timestamp > CACHE_TTL || removedCount < limit) {
                requestCache.delete(key);
                removedCount++;
            }
            if (removedCount >= limit) break;
        }
    }
};
setInterval(cleanupCache, 1000 * 60 * 60);

const inFlightRequests = new Map();

/**
 * Generate cache key - Includes AppSource for isolation
 * Uses SHA-256 to prevent collisions from truncation
 */
const getCacheKey = (appSource, prompt, contents, generationConfig, systemInstruction) => {
    const contentStr = JSON.stringify({ 
        module: appSource,
        prompt,
        contents,
        config: generationConfig,
        systemInstruction
    });
    
    // Use SHA-256 for a stable, unique key
    const hash = crypto.createHash('sha256').update(contentStr).digest('hex');
    return `${appSource}:${hash}`;
};

/**
 * Deduplication
 */
const withDeduplication = async (key, requestFn) => {
    const existing = inFlightRequests.get(key);
    if (existing) {
        console.log(`[AI Proxy] Deduplicating request: ${key.substring(0, 50)}...`);
        return existing;
    }
    
    const promise = requestFn().finally(() => {
        inFlightRequests.delete(key);
    });
    inFlightRequests.set(key, promise);
    return promise;
};

// Helper for logging to DB (Non-blocking)
const logToHistory = async (appOwner, prompt, response, status, errorMsg = null) => {
    try {
        const promptPreview = typeof prompt === 'string' ? prompt.substring(0, 500) : JSON.stringify(prompt).substring(0, 500);
        await pool.query(
            `INSERT INTO ai_history (app_owner, prompt_preview, response, status, error_message, created_at) 
             VALUES ($1, $2, $3, $4, $5, NOW())`,
            [appOwner, promptPreview, response, status, errorMsg]
        );
    } catch (err) {
        console.error('[AI Log] Failed to insert history:', err.message);
    }
};

/**
 * POST /api/ai/generate
 */
router.post('/generate', async (req, res) => {
    const { appSource, apiKey, systemPrompt: configSystemPrompt, model } = req.aiConfig || { appSource: 'GENERAL' };
    
    try {
        const { prompt, contents, generationConfig, systemInstruction } = req.body;

        if (!prompt && !contents) {
            return res.status(400).json({ error: 'Prompt or contents is required' });
        }

        if (!apiKey) {
            return res.status(500).json({ error: `AI Service not configured for ${appSource}` });
        }

        const cacheKey = getCacheKey(appSource, prompt, contents, generationConfig, systemInstruction);
        
        // 1. Check Cache
        const cached = requestCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            console.log(`[AI Proxy] Cache hit for ${appSource}`);
            return res.json({ text: cached.text, cached: true });
        }

        // 2. Fetch from Gemini with Retry Logic
        const result = await withDeduplication(cacheKey, async () => {
             console.log(`[AI Proxy] Initial attempt for ${appSource}`);
             
             // List of keys to try (deduplicated)
             const keysToTry = [...new Set([apiKey, ...(req.aiConfig.apiKeys || [])])].filter(Boolean);
             // List of models to try
             const baseModel = model || process.env.GEMINI_MODEL || req.aiConfig.model || 'gemini-2.0-flash';
             const modelsToTry = [baseModel, ...(req.aiConfig.fallbackModels || [])];

             let lastError = null;

             for (const currentModel of modelsToTry) {
                 for (const currentKey of keysToTry) {
                     try {
                         console.log(`[AI Proxy] Calling Gemini (${currentModel}) for ${appSource} using key ending in ...${currentKey.slice(-4)}`);
                         const genAI = new GoogleGenAI({ apiKey: currentKey });
                         
                         // Prioritize request system instruction, fallback to config
                         const finalSystemInstruction = systemInstruction || configSystemPrompt;

                         // Normalize contents for SDK
                         let finalContents = contents;
                         if (prompt && !contents) {
                             finalContents = [{ role: 'user', parts: [{ text: prompt }] }];
                         } else if (typeof contents === 'string') {
                             finalContents = [{ role: 'user', parts: [{ text: contents }] }];
                         } else if (contents && !Array.isArray(contents)) {
                             // Handle single content object
                             finalContents = [contents];
                         }

                         // Ensure parts are valid (SDK requirement)
                         if (Array.isArray(finalContents)) {
                            finalContents = finalContents.map(c => {
                                if (typeof c === 'string') return { role: 'user', parts: [{ text: c }] };
                                if (c.parts && !Array.isArray(c.parts)) c.parts = [c.parts];
                                return c;
                            });
                         }

                         const response = await genAI.models.generateContent({ 
                             model: currentModel,
                             contents: finalContents,
                             config: {
                                 ...(generationConfig || {}),
                                 systemInstruction: finalSystemInstruction
                             },
                             tools: req.body.tools // Support Google Search grounding
                         });

                         // Extract text from SDK response
                         const text = response.text || (response.candidates?.[0]?.content?.parts?.[0]?.text) || "";
                         
                         // Enhanced result with candidates if it was grounding
                         return { 
                             text, 
                             modelUsed: currentModel,
                             candidates: response.candidates 
                         };
                     } catch (err) {
                         lastError = err;
                         const isRateLimit = err.status === 429 || err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED');
                         
                         if (isRateLimit) {
                             console.warn(`[AI Proxy] Rate limit hit for model ${currentModel} with key ...${currentKey.slice(-4)}. Trying next option...`);
                             continue; // Try next key/model
                         }
                         
                         // If it's not a rate limit error, we might want to fail fast or try another key depending on the error
                         console.error(`[AI Proxy] Error with ${currentModel}:`, err.message);
                         if (err.message?.includes('not found') || err.message?.includes('model')) {
                             continue; // Try next model
                         }
                         
                         throw err; // Rethrow other errors
                     }
                 }
             }

             // If we reach here, all attempts failed
             throw lastError || new Error('All AI fallback attempts failed');
        });

        // 3. Store in cache & Log success
        requestCache.set(cacheKey, { text: result.text, timestamp: Date.now() });
        logToHistory(appSource, prompt || contents, result.text, 'success', `Model: ${result.modelUsed}`);
        
        res.json({ text: result.text, cached: false, model: result.modelUsed, candidates: result.candidates });

    } catch (error) {
        console.error(`AI Error [${appSource}]:`, error);
        
        // Log failure
        logToHistory(appSource, req.body.prompt, null, 'failed', error.message);

        const isRateLimit = error.status === 429 || error.message?.includes('429');
        
        if (isRateLimit) {
            // Log specifically for rate limit
            logToHistory(appSource, req.body.prompt, null, 'rate_limited', 'Quota Exceeded');
            
            return res.status(429).json({ 
                error: 'Quota exceeded', 
                message: `Layanan AI untuk ${appSource} sedang sibuk. Silakan coba lagi nanti.` 
            });
        }

        res.status(500).json({ 
            error: 'Internal Server Error', 
            message: error.message || 'Terjadi kesalahan pada layanan AI.' 
        });
    }
});

module.exports = router;
