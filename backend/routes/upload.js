// routes/upload.js - Image upload routes
const express = require('express');
const fs = require('fs');
const path = require('path');
const upload = require('../middleware/upload');

const router = express.Router();

// Import error handling middleware
const { handleMulterError } = require('../middleware/upload');

// POST /api/upload/image - Single image upload
router.post('/image', 
  upload.single('image'),
  handleMulterError,
  async (req, res) => {
    try {
      console.log('=== IMAGE UPLOAD ===');
      console.log('File:', req.file);
      console.log('Body:', req.body);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Tidak ada file yang diupload'
        });
      }

      const file = req.file;
      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      
      // Construct image URL
      const imageUrl = `${baseUrl}/uploads/news/${file.filename}`;
      
      // Create response data
      const imageData = {
        filename: file.filename,
        originalName: file.originalname,
        url: imageUrl,
        relativePath: `/uploads/news/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype,
        alt: req.body.alt || req.body.title || '',
        caption: req.body.caption || req.body.description || '',
        category: req.body.category || 'general'
      };

      console.log('Image uploaded successfully:', imageData);

      res.status(201).json({
        success: true,
        message: 'Gambar berhasil diupload',
        image: imageData,
        // Legacy support
        imageUrl: imageUrl,
        filename: file.filename
      });

    } catch (error) {
      console.error('Upload image error:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengupload gambar',
        error: error.message
      });
    }
  }
);

// POST /api/upload/multiple - Multiple images upload
router.post('/multiple', 
  upload.uploadMultiple.array('images', 5), // Use uploadMultiple middleware
  handleMulterError,
  async (req, res) => {
    try {
      console.log('=== MULTIPLE IMAGE UPLOAD ===');
      console.log('Files:', req.files);

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Tidak ada file yang diupload'
        });
      }

      const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
      const uploadedImages = [];

      for (const file of req.files) {
        const imageData = {
          filename: file.filename,
          originalName: file.originalname,
          url: `${baseUrl}/uploads/news/${file.filename}`,
          relativePath: `/uploads/news/${file.filename}`,
          size: file.size,
          mimetype: file.mimetype
        };
        uploadedImages.push(imageData);
      }

      console.log('Multiple images uploaded:', uploadedImages.length);

      res.status(201).json({
        success: true,
        message: `${uploadedImages.length} gambar berhasil diupload`,
        images: uploadedImages,
        count: uploadedImages.length
      });

    } catch (error) {
      console.error('Upload multiple images error:', error);
      res.status(500).json({
        success: false,
        message: 'Gagal mengupload gambar',
        error: error.message
      });
    }
  }
);

// DELETE /api/upload/image - Delete image
router.delete('/image', async (req, res) => {
  try {
    console.log('=== DELETE IMAGE ===');
    console.log('Request body:', req.body);

    const { imageUrl, filename } = req.body;

    if (!imageUrl && !filename) {
      return res.status(400).json({
        success: false,
        message: 'URL gambar atau nama file harus disediakan'
      });
    }

    let fileToDelete = filename;
    
    // Extract filename from URL if only URL provided
    if (!fileToDelete && imageUrl) {
      const urlPath = new URL(imageUrl).pathname;
      fileToDelete = path.basename(urlPath);
    }

    // Construct full file path
    const filePath = path.join(__dirname, '../uploads/news/', fileToDelete);
    
    console.log('Attempting to delete file:', filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File tidak ditemukan'
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);
    
    console.log('File deleted successfully:', fileToDelete);

    res.json({
      success: true,
      message: 'Gambar berhasil dihapus',
      deletedFile: fileToDelete
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus gambar',
      error: error.message
    });
  }
});

// GET /api/upload/image/metadata - Get image metadata
router.get('/image/metadata', async (req, res) => {
  try {
    const { url, filename } = req.query;

    if (!url && !filename) {
      return res.status(400).json({
        success: false,
        message: 'URL atau nama file harus disediakan'
      });
    }

    let targetFile = filename;
    
    // Extract filename from URL if only URL provided
    if (!targetFile && url) {
      const urlPath = new URL(url).pathname;
      targetFile = path.basename(urlPath);
    }

    // Construct full file path
    const filePath = path.join(__dirname, '../uploads/news/', targetFile);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File tidak ditemukan'
      });
    }

    // Get file stats
    const stats = fs.statSync(filePath);
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    const metadata = {
      filename: targetFile,
      url: `${baseUrl}/uploads/news/${targetFile}`,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      exists: true
    };

    res.json({
      success: true,
      metadata: metadata
    });

  } catch (error) {
    console.error('Get image metadata error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan metadata gambar',
      error: error.message
    });
  }
});

// GET /api/upload/list - List uploaded images
router.get('/list', async (req, res) => {
  try {
    const { category = 'news', limit = 50 } = req.query;
    
    const uploadDir = path.join(__dirname, `../uploads/${category}/`);
    
    // Check if directory exists
    if (!fs.existsSync(uploadDir)) {
      return res.json({
        success: true,
        images: [],
        count: 0,
        message: 'Direktori upload belum ada'
      });
    }

    // Read directory
    const files = fs.readdirSync(uploadDir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .slice(0, parseInt(limit))
      .map(file => {
        const filePath = path.join(uploadDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          filename: file,
          url: `${baseUrl}/uploads/${category}/${file}`,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
      .sort((a, b) => new Date(b.created) - new Date(a.created)); // Sort by newest first

    res.json({
      success: true,
      images: images,
      count: images.length,
      category: category
    });

  } catch (error) {
    console.error('List images error:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mendapatkan daftar gambar',
      error: error.message
    });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Upload route error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File terlalu besar. Maksimal 5MB.'
    });
  }
  
  if (error.message && error.message.includes('Format file tidak didukung')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada upload',
    error: error.message
  });
});

module.exports = router;