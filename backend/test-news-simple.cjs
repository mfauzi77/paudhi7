// test-news-simple.cjs - Simple test script untuk memeriksa data berita
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing News Data (Simple Version)...\n');

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

// Test 1: Check news data without populate
const testNewsDataSimple = async () => {
  console.log('1️⃣ Checking news data (simple)...');
  
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
      console.log(`      Author ID: ${news.author}`);
      console.log(`      Created: ${news.createdAt}`);
      
      // Check if image file exists
      if (news.image) {
        const fs = require('fs');
        const imagePath = `uploads/news/${news.image}`;
        if (fs.existsSync(imagePath)) {
          const stats = fs.statSync(imagePath);
          console.log(`      ✅ Image file exists: ${(stats.size / 1024).toFixed(2)} KB`);
          
          // Test image URL construction
          const baseUrl = 'http://localhost:5000';
          const imageUrl = `${baseUrl}/uploads/news/${news.image}`;
          console.log(`      🔗 Image URL: ${imageUrl}`);
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

// Test 2: Check database collections
const checkCollections = async () => {
  console.log('\n2️⃣ Checking database collections...');
  
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   📚 Available collections: ${collections.length}`);
    
    collections.forEach(collection => {
      console.log(`      - ${collection.name}`);
    });
    
    // Check news collection specifically
    const newsCollection = collections.find(c => c.name === 'news');
    if (newsCollection) {
      console.log(`   ✅ News collection found`);
      
      // Count documents in news collection
      const newsCount = await mongoose.connection.db.collection('news').countDocuments();
      console.log(`   📊 News documents count: ${newsCount}`);
      
      if (newsCount > 0) {
        // Get sample document
        const sampleDoc = await mongoose.connection.db.collection('news').findOne({});
        console.log(`   📝 Sample document structure:`);
        console.log(`      Keys: ${Object.keys(sampleDoc).join(', ')}`);
        
        if (sampleDoc.image) {
          console.log(`      Image field: ${sampleDoc.image}`);
          console.log(`      Image type: ${typeof sampleDoc.image}`);
        }
      }
    } else {
      console.log(`   ❌ News collection not found`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking collections: ${error.message}`);
  }
};

// Test 3: Check file system
const checkFileSystem = () => {
  console.log('\n3️⃣ Checking file system...');
  
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Check upload directories
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
    console.log(`   ❌ Error checking file system: ${error.message}`);
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
    await testNewsDataSimple();
    await checkCollections();
    checkFileSystem();
    
    console.log('\n🎯 Simple News Data Test Complete!');
    console.log('📝 Check the results above for any issues.');
    console.log('\n💡 Key findings:');
    console.log('   1. Check if news collection exists and has data');
    console.log('   2. Check if image field is properly saved');
    console.log('   3. Check if image files exist in uploads/news');
    console.log('   4. Verify image URL construction');
    
  } catch (error) {
    console.log('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

// Run tests
runTests();
