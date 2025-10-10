// test-news-data.cjs - Test script untuk memeriksa data berita di database
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing News Data in Database...\n');

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

// Test 1: Check news data structure
const testNewsDataStructure = async () => {
  console.log('1️⃣ Checking news data structure...');
  
  try {
    const News = require('./models/News.js');
    
    // Get all news
    const allNews = await News.find({}).populate('author', 'fullName email klName');
    console.log(`   📊 Total news in database: ${allNews.length}`);
    
    if (allNews.length === 0) {
      console.log('   📭 No news found in database');
      return;
    }
    
    // Check first few news items
    const sampleNews = allNews.slice(0, 5);
    sampleNews.forEach((news, index) => {
      console.log(`\n   📰 News ${index + 1}:`);
      console.log(`      ID: ${news._id}`);
      console.log(`      Title: ${news.title}`);
      console.log(`      Status: ${news.status}`);
      console.log(`      Image field: ${news.image || 'null'}`);
      console.log(`      Image type: ${typeof news.image}`);
      console.log(`      Author: ${news.author?.fullName || news.author?.email || 'Unknown'}`);
      console.log(`      Created: ${news.createdAt}`);
      
      // Check if image file exists
      if (news.image) {
        const fs = require('fs');
        const imagePath = `uploads/news/${news.image}`;
        if (fs.existsSync(imagePath)) {
          const stats = fs.statSync(imagePath);
          console.log(`      ✅ Image file exists: ${(stats.size / 1024).toFixed(2)} KB`);
        } else {
          console.log(`      ❌ Image file missing: ${imagePath}`);
        }
      }
    });
    
    // Check image field statistics
    const newsWithImages = allNews.filter(news => news.image);
    const newsWithoutImages = allNews.filter(news => !news.image);
    
    console.log(`\n   📊 Image field statistics:`);
    console.log(`      News with images: ${newsWithImages.length}`);
    console.log(`      News without images: ${newsWithoutImages.length}`);
    
    if (newsWithImages.length > 0) {
      console.log(`\n   🖼️ Sample images:`);
      newsWithImages.slice(0, 3).forEach((news, index) => {
        console.log(`      ${index + 1}. ${news.image}`);
      });
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking news data: ${error.message}`);
  }
};

// Test 2: Check specific news by ID
const testSpecificNews = async () => {
  console.log('\n2️⃣ Checking specific news by ID...');
  
  try {
    const News = require('./models/News.js');
    
    // Get first news with image
    const newsWithImage = await News.findOne({ image: { $exists: true, $ne: null } });
    
    if (newsWithImage) {
      console.log(`   📰 Found news with image:`);
      console.log(`      ID: ${newsWithImage._id}`);
      console.log(`      Title: ${newsWithImage.title}`);
      console.log(`      Image: ${newsWithImage.image}`);
      console.log(`      Status: ${newsWithImage.status}`);
      
      // Check image file
      const fs = require('fs');
      const imagePath = `uploads/news/${newsWithImage.image}`;
      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        console.log(`      ✅ Image file: ${imagePath} (${(stats.size / 1024).toFixed(2)} KB)`);
        
        // Test image URL construction
        const baseUrl = 'http://localhost:5000';
        const imageUrl = `${baseUrl}/uploads/news/${newsWithImage.image}`;
        console.log(`      🔗 Image URL: ${imageUrl}`);
      } else {
        console.log(`      ❌ Image file missing: ${imagePath}`);
      }
    } else {
      console.log('   📭 No news with images found');
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking specific news: ${error.message}`);
  }
};

// Test 3: Check image field mapping
const testImageFieldMapping = async () => {
  console.log('\n3️⃣ Checking image field mapping...');
  
  try {
    const News = require('./models/News.js');
    
    // Get news created in last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const recentNews = await News.find({
      createdAt: { $gte: yesterday }
    }).populate('author', 'fullName email');
    
    console.log(`   📅 News created in last 24 hours: ${recentNews.length}`);
    
    recentNews.forEach((news, index) => {
      console.log(`\n   📰 Recent News ${index + 1}:`);
      console.log(`      Title: ${news.title}`);
      console.log(`      Image: ${news.image || 'null'}`);
      console.log(`      Image type: ${typeof news.image}`);
      console.log(`      Created: ${news.createdAt}`);
      
      if (news.image) {
        const fs = require('fs');
        const imagePath = `uploads/news/${news.image}`;
        if (fs.existsSync(imagePath)) {
          const stats = fs.statSync(imagePath);
          console.log(`      ✅ Image file exists: ${(stats.size / 1024).toFixed(2)} KB`);
        } else {
          console.log(`      ❌ Image file missing: ${imagePath}`);
        }
      }
    });
    
  } catch (error) {
    console.log(`   ❌ Error checking recent news: ${error.message}`);
  }
};

// Test 4: Check upload middleware
const testUploadMiddleware = () => {
  console.log('\n4️⃣ Checking upload middleware...');
  
  try {
    const upload = require('./middleware/upload.js');
    
    if (upload && upload.upload) {
      console.log('   ✅ Upload middleware loaded');
      console.log(`   📝 Upload single: ${typeof upload.upload}`);
      console.log(`   📝 Upload multiple: ${typeof upload.uploadMultiple}`);
    } else {
      console.log('   ❌ Upload middleware not loaded correctly');
    }
    
    // Check upload configuration
    const uploadPath = './middleware/upload.js';
    const fs = require('fs');
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
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking upload middleware: ${error.message}`);
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
    await testNewsDataStructure();
    await testSpecificNews();
    await testImageFieldMapping();
    testUploadMiddleware();
    
    console.log('\n🎯 News Data Test Complete!');
    console.log('📝 Check the results above for any issues.');
    console.log('\n💡 If images are not displaying, check:');
    console.log('   1. Image field is properly saved in database');
    console.log('   2. Image files exist in uploads/news folder');
    console.log('   3. Frontend is constructing correct image URLs');
    console.log('   4. Backend server is running and serving static files');
    
  } catch (error) {
    console.log('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

// Run tests
runTests();
