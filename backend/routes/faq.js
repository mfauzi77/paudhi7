// routes/faq.js - FIXED VERSION dengan import yang benar
const express = require('express');
const FAQ = require('../models/FAQ');
const { auth, requireRole } = require('../middleware/auth'); // ✅ FIXED: gunakan auth dan requireRole
const { validateFAQ } = require('../middleware/validation');

const router = express.Router();

// GET /api/faq - Public
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const faqs = await FAQ.find(query)
      .populate('createdBy', 'fullName username')
      .sort({ order: 1, createdAt: -1 });
    
    res.json(faqs);
  } catch (error) {
    console.error('Get FAQ error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/faq/all - Admin/Editor only, get all FAQs including inactive
router.get('/all',
  auth, // ✅ FIXED: gunakan auth (bukan authenticate)
  requireRole(['admin', 'editor']), // ✅ FIXED: gunakan requireRole (bukan authorize)
  async (req, res) => {
    try {
      const { category, search, isActive } = req.query;
      
      const query = {};
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (isActive !== undefined) {
        query.isActive = isActive === 'true';
      }
      
      if (search) {
        query.$or = [
          { question: { $regex: search, $options: 'i' } },
          { answer: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      
      const faqs = await FAQ.find(query)
        .populate('createdBy', 'fullName username')
        .sort({ order: 1, createdAt: -1 });
      
      res.json(faqs);
    } catch (error) {
      console.error('Get all FAQ error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// GET /api/faq/:id - Get single FAQ
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id)
      .populate('createdBy', 'fullName username');
    
    if (!faq) {
      return res.status(404).json({ message: 'FAQ tidak ditemukan' });
    }
    
    // Jika FAQ tidak aktif, hanya admin yang bisa lihat
    if (!faq.isActive && !req.headers.authorization) {
      return res.status(404).json({ message: 'FAQ tidak ditemukan' });
    }
    
    res.json(faq);
  } catch (error) {
    console.error('Get FAQ by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/faq - Admin/Editor only, create FAQ
router.post('/', 
  auth, // ✅ FIXED: gunakan auth
  requireRole(['admin', 'editor']), // ✅ FIXED: gunakan requireRole
  validateFAQ, 
  async (req, res) => {
    try {
      console.log('Creating FAQ with data:', req.body);
      
      const faqData = {
        ...req.body,
        createdBy: req.user.userId
      };
      
      // Parse tags if string
      if (typeof faqData.tags === 'string') {
        faqData.tags = faqData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
      
      // Ensure tags is array
      if (!Array.isArray(faqData.tags)) {
        faqData.tags = [];
      }
      
      const faq = new FAQ(faqData);
      await faq.save();
      
      // Populate creator info before sending response
      await faq.populate('createdBy', 'fullName username');
      
      res.status(201).json({
        message: 'FAQ berhasil dibuat',
        faq
      });
    } catch (error) {
      console.error('Create FAQ error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// PUT /api/faq/:id - Admin/Editor only, update FAQ
router.put('/:id',
  auth, // ✅ FIXED: gunakan auth
  requireRole(['admin', 'editor']), // ✅ FIXED: gunakan requireRole
  validateFAQ,
  async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      
      if (!faq) {
        return res.status(404).json({ message: 'FAQ tidak ditemukan' });
      }
      
      // Check if user can edit this FAQ
      if (req.user.role !== 'admin' && faq.createdBy.toString() !== req.user.userId) {
        return res.status(403).json({ 
          message: 'Tidak memiliki akses untuk mengedit FAQ ini' 
        });
      }
      
      const updateData = { ...req.body };
      
      // Parse tags if string
      if (typeof updateData.tags === 'string') {
        updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      }
      
      // Ensure tags is array
      if (!Array.isArray(updateData.tags)) {
        updateData.tags = [];
      }
      
      Object.assign(faq, updateData);
      faq.updatedAt = new Date();
      await faq.save();
      
      await faq.populate('createdBy', 'fullName username');
      
      res.json({
        message: 'FAQ berhasil diupdate',
        faq
      });
    } catch (error) {
      console.error('Update FAQ error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// DELETE /api/faq/:id - Admin only
router.delete('/:id',
  auth, // ✅ FIXED: gunakan auth
  requireRole(['admin']), // ✅ FIXED: gunakan requireRole
  async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      
      if (!faq) {
        return res.status(404).json({ message: 'FAQ tidak ditemukan' });
      }
      
      await FAQ.findByIdAndDelete(req.params.id);
      
      res.json({ message: 'FAQ berhasil dihapus' });
    } catch (error) {
      console.error('Delete FAQ error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// PATCH /api/faq/:id/toggle - Admin/Editor, toggle active status
router.patch('/:id/toggle',
  auth, // ✅ FIXED: gunakan auth
  requireRole(['admin', 'editor']), // ✅ FIXED: gunakan requireRole
  async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id);
      
      if (!faq) {
        return res.status(404).json({ message: 'FAQ tidak ditemukan' });
      }
      
      // Check permission
      if (req.user.role !== 'admin' && faq.createdBy.toString() !== req.user.userId) {
        return res.status(403).json({ 
          message: 'Tidak memiliki akses untuk mengubah status FAQ ini' 
        });
      }
      
      faq.isActive = !faq.isActive;
      faq.updatedAt = new Date();
      await faq.save();
      
      res.json({
        message: `FAQ berhasil ${faq.isActive ? 'diaktifkan' : 'dinonaktifkan'}`,
        faq
      });
    } catch (error) {
      console.error('Toggle FAQ status error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// PUT /api/faq/reorder - Admin only, reorder FAQs
router.put('/reorder',
  auth, // ✅ FIXED: gunakan auth
  requireRole(['admin']), // ✅ FIXED: gunakan requireRole
  async (req, res) => {
    try {
      const { faqIds } = req.body; // Array of FAQ IDs in new order
      
      if (!Array.isArray(faqIds)) {
        return res.status(400).json({ message: 'FAQ IDs harus berupa array' });
      }
      
      // Update order for each FAQ
      const updatePromises = faqIds.map((id, index) =>
        FAQ.findByIdAndUpdate(id, { order: index + 1 })
      );
      
      await Promise.all(updatePromises);
      
      res.json({ message: 'Urutan FAQ berhasil diupdate' });
    } catch (error) {
      console.error('Reorder FAQ error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

module.exports = router;