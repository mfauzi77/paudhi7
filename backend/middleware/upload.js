// middleware/upload.js - Upload middleware
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    
    // Determine upload path based on field name or route
    if (req.route && req.route.path.includes('/news')) {
      uploadPath = 'uploads/news/';
    } else if (req.route && req.route.path.includes('/faq')) {
      uploadPath = 'uploads/faq/';
    } else if (file.fieldname === 'image') {
      uploadPath = 'uploads/news/'; // Default for news images
    }
    
    // Ensure directory exists
    ensureDirectoryExists(uploadPath);
    
    console.log(`Upload destination: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
    
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  console.log('File filter - checking file:', file.originalname, file.mimetype);
  
  // Allowed image types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ];

  if (allowedTypes.includes(file.mimetype.toLowerCase())) {
    console.log('File type accepted:', file.mimetype);
    cb(null, true);
  } else {
    console.log('File type rejected:', file.mimetype);
    cb(new Error(`Format file tidak didukung: ${file.mimetype}. Gunakan JPEG, PNG, GIF, atau WebP.`), false);
  }
};

// Create multer instance for single file upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 1 // Maximum 1 file per request for single upload
  }
});

// Create multer instance for multiple file upload
const uploadMultiple = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5 // Maximum 5 files
  }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  console.error('Upload Error:', error);
  
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({ 
          success: false,
          message: 'File terlalu besar. Maksimal 5MB.' 
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({ 
          success: false,
          message: 'Terlalu banyak file. Maksimal 1 file.' 
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({ 
          success: false,
          message: 'Field file tidak dikenali.' 
        });
      default:
        return res.status(400).json({ 
          success: false,
          message: 'Error upload file: ' + error.message 
        });
    }
  }
  
  // Handle custom file filter errors
  if (error.message && error.message.includes('Format file tidak didukung')) {
    return res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
  
  // Handle other errors
  return res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan saat upload file',
    error: error.message
  });
};

// Debug middleware to log upload details
const logUpload = (req, res, next) => {
  console.log('=== UPLOAD MIDDLEWARE ===');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Content-Type:', req.get('Content-Type'));
  
  // Log after upload processing
  const originalNext = next;
  next = (...args) => {
    if (req.file) {
      console.log('File uploaded:', {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        destination: req.file.destination,
        path: req.file.path
      });
    } else {
      console.log('No file uploaded');
    }
    originalNext(...args);
  };
  
  next();
};

module.exports = upload;
module.exports.handleMulterError = handleMulterError;
module.exports.logUpload = logUpload;
module.exports.uploadMultiple = uploadMultiple;