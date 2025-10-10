// test-news-upload.cjs - Test script untuk upload berita dengan gambar
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('🧪 Testing News Upload with Image...\n');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/paudhi", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
    return true;
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

// Test 1: Check current news data
const checkCurrentNews = async () => {
  console.log('1️⃣ Checking current news data...');
  
  try {
    // Define News schema directly
    const newsSchema = new mongoose.Schema({
      title: String,
      content: String,
      image: String,
      status: String,
      author: mongoose.Schema.Types.ObjectId,
      createdAt: Date
    });
    
    const News = mongoose.model('News', newsSchema);
    
    // Get all news
    const allNews = await News.find({});
    console.log(`   📊 Total news in database: ${allNews.length}`);
    
    if (allNews.length > 0) {
      const newsWithImages = allNews.filter(news => news.image);
      const newsWithoutImages = allNews.filter(news => !news.image);
      
      console.log(`   📊 Image field statistics:`);
      console.log(`      News with images: ${newsWithImages.length}`);
      console.log(`      News without images: ${newsWithoutImages.length}`);
      
      // Show sample news
      const sampleNews = allNews.slice(0, 3);
      sampleNews.forEach((news, index) => {
        console.log(`\n   📰 News ${index + 1}:`);
        console.log(`      Title: ${news.title}`);
        console.log(`      Image: ${news.image || 'null'}`);
        console.log(`      Image type: ${typeof news.image}`);
        console.log(`      Status: ${news.status}`);
      });
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking news data: ${error.message}`);
  }
};

// Test 2: Check upload directories and files
const checkUploadDirectories = () => {
  console.log('\n2️⃣ Checking upload directories...');
  
  try {
    const uploadDirs = ['uploads', 'uploads/news', 'uploads/faq', 'uploads/images', 'uploads/pembelajaran'];
    
    uploadDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        console.log(`   ✅ ${dir} exists`);
        
        if (dir === 'uploads/news') {
          try {
            const files = fs.readdirSync(dir);
            console.log(`      📁 Files in ${dir}: ${files.length} files`);
            if (files.length > 0) {
              console.log(`      📸 Sample files: ${files.slice(0, 3).join(', ')}`);
              
              // Check first image file
              const firstImage = files[0];
              const imagePath = path.join(dir, firstImage);
              const stats = fs.statSync(imagePath);
              console.log(`      🖼️ First image: ${firstImage} (${(stats.size / 1024).toFixed(2)} KB)`);
            }
          } catch (error) {
            console.log(`      ❌ Error reading ${dir}: ${error.message}`);
          }
        }
      } else {
        console.log(`   ❌ ${dir} missing`);
      }
    });
    
  } catch (error) {
    console.log(`   ❌ Error checking upload directories: ${error.message}`);
  }
};

// Test 3: Simulate image field saving
const simulateImageFieldSaving = () => {
  console.log('\n3️⃣ Simulating image field saving...');
  
  try {
    // Simulate the upload process
    const mockFile = {
      filename: 'test-image-123.jpg',
      originalname: 'test-image.jpg',
      mimetype: 'image/jpeg',
      size: 1024000
    };
    
    const mockReq = {
      file: mockFile,
      user: { _id: 'mock-user-id' }
    };
    
    // Simulate the image field assignment
    const imageField = mockReq.file ? mockReq.file.filename : null;
    
    console.log(`   📁 Mock file: ${mockFile.filename}`);
    console.log(`   🔗 Image field value: ${imageField}`);
    console.log(`   📝 Image field type: ${typeof imageField}`);
    
    if (imageField) {
      console.log(`   ✅ Image field assigned correctly`);
      
      // Test image URL construction
      const baseUrl = 'http://localhost:5000';
      const imageUrl = `${baseUrl}/uploads/news/${imageField}`;
      console.log(`   🌐 Image URL: ${imageUrl}`);
      
      // Check if file would exist
      const imagePath = `uploads/news/${imageField}`;
      if (fs.existsSync(imagePath)) {
        console.log(`   ✅ Image file exists at path`);
      } else {
        console.log(`   ❌ Image file would not exist at path (this is expected for test)`);
      }
    } else {
      console.log(`   ❌ Image field not assigned`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error simulating image field saving: ${error.message}`);
  }
};

// Test 4: Check News model schema
const checkNewsSchema = () => {
  console.log('\n4️⃣ Checking News model schema...');
  
  try {
    const News = require('./models/News.js');
    console.log('   ✅ News model loaded');
    
    // Check image field in schema
    const imageField = News.schema.paths.image;
    if (imageField) {
      console.log(`   📝 Image field type: ${imageField.instance}`);
      console.log(`   📝 Image field required: ${imageField.isRequired}`);
      console.log(`   📝 Image field default: ${imageField.defaultValue}`);
      
      if (imageField.instance === 'String') {
        console.log(`   ✅ Image field is String type (correct)`);
      } else {
        console.log(`   ❌ Image field is not String type: ${imageField.instance}`);
      }
    } else {
      console.log(`   ❌ Image field not found in schema`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error loading News model: ${error.message}`);
  }
};

// Test 5: Check upload middleware
const checkUploadMiddleware = () => {
  console.log('\n5️⃣ Checking upload middleware...');
  
  try {
    const upload = require('./middleware/upload.js');
    
    if (upload && upload.upload) {
      console.log('   ✅ Upload middleware loaded');
      console.log(`   📝 Upload single: ${typeof upload.upload}`);
      console.log(`   📝 Upload multiple: ${typeof upload.uploadMultiple}`);
      
      // Check upload configuration
      const uploadPath = './middleware/upload.js';
      if (fs.existsSync(uploadPath)) {
        const uploadContent = fs.readFileSync(uploadPath, 'utf8');
        
        if (uploadContent.includes('destination')) {
          console.log('   ✅ Upload destination configured');
        } else {
          console.log('   ❌ Upload destination not configured');
        }
        
        if (uploadContent.includes('filename')) {
          console.log('   ✅ Upload filename configured');
        } else {
          console.log('   ❌ Upload filename not configured');
        }
        
        if (uploadContent.includes('uploads/news/')) {
          console.log('   ✅ News upload path configured');
        } else {
          console.log('   ❌ News upload path not configured');
        }
      }
    } else {
      console.log('   ❌ Upload middleware not loaded correctly');
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking upload middleware: ${error.message}`);
  }
};

// Test 6: Check routes configuration
const checkRoutesConfiguration = () => {
  console.log('\n6️⃣ Checking routes configuration...');
  
  try {
    const routesPath = './routes/news.js';
    if (fs.existsSync(routesPath)) {
      const routesContent = fs.readFileSync(routesPath, 'utf8');
      
      if (routesContent.includes('upload.single("image")')) {
        console.log('   ✅ Upload middleware configured in routes');
      } else {
        console.log('   ❌ Upload middleware not configured in routes');
      }
      
      if (routesContent.includes('req.file ? req.file.filename : null')) {
        console.log('   ✅ Image field assignment configured');
      } else {
        console.log('   ❌ Image field assignment not configured');
      }
      
      if (routesContent.includes('image: req.file ? req.file.filename : null')) {
        console.log('   ✅ Image field mapping correct');
      } else {
        console.log('   ❌ Image field mapping incorrect');
      }
    } else {
      console.log('   ❌ Routes file not found');
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking routes configuration: ${error.message}`);
  }
};

// Main test function
const runTests = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ Cannot run tests without database connection');
    return;
  }
  
  try {
    await checkCurrentNews();
    checkUploadDirectories();
    simulateImageFieldSaving();
    checkNewsSchema();
    checkUploadMiddleware();
    checkRoutesConfiguration();
    
    console.log('\n🎯 News Upload Test Complete!');
    console.log('📝 Check the results above for any issues.');
    console.log('\n💡 Key findings:');
    console.log('   1. Check if image field is properly assigned in routes');
    console.log('   2. Check if upload middleware is working correctly');
    console.log('   3. Check if News model schema is correct');
    console.log('   4. Check if image files are being saved to correct path');
    console.log('\n🚀 Next steps:');
    console.log('   1. Test actual news upload with image');
    console.log('   2. Check browser network tab for upload requests');
    console.log('   3. Verify image field in database after upload');
    console.log('   4. Test image display in frontend');
    
  } catch (error) {
    console.log('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

// Run tests
runTests();
