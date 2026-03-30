const { GoogleGenAI } = require('@google/genai');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function listModels() {
  try {
    const apiKey = process.env.GEMINI_API_KEY_PAUD;
    const ai = new GoogleGenAI({ apiKey });
    
    console.log('Listing all available models...');
    const result = await ai.models.list();
    
    let models = [];
    if (result.models) {
        models = result.models;
    } else if (Array.isArray(result)) {
        models = result;
    } else if (result.pageInternal) {
        models = result.pageInternal;
    }
    
    console.log(`Found ${models.length} items.`);
    fs.writeFileSync('models_list.json', JSON.stringify(models, null, 2));
    console.log('Saved to models_list.json');

  } catch (err) {
    console.error('Error:', err.message);
  }
}

listModels();
