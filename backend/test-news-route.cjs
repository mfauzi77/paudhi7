// test-news-route.cjs - Test script untuk test route GET /news
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing News GET Route...\n');

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

// Test 1: Check if news exist in database
const checkNewsInDatabase = async () => {
  console.log('1️⃣ Checking news in database...');
  
  try {
    const News = require('./models/News.js');
    
    // Get all news
    const allNews = await News.find({});
    console.log(`   📊 Total news in database: ${allNews.length}`);
    
    if (allNews.length > 0) {
      allNews.forEach((news, index) => {
        console.log(`\n   📰 News ${index + 1}:`);
        console.log(`      ID: ${news._id}`);
        console.log(`      Title: ${news.title}`);
        console.log(`      Status: ${news.status}`);
        console.log(`      isActive: ${news.isActive}`);
        console.log(`      Author: ${news.author}`);
        console.log(`      Created: ${news.createdAt}`);
      });
    } else {
      console.log('   ❌ No news found in database');
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking news: ${error.message}`);
  }
};

// Test 2: Test different query scenarios
const testQueryScenarios = async () => {
  console.log('\n2️⃣ Testing different query scenarios...');
  
  try {
    const News = require('./models/News.js');
    
    // Test 1: All active news
    console.log('\n   🔍 Test 1: All active news');
    const activeNews = await News.find({ isActive: true });
    console.log(`      Found: ${activeNews.length} active news`);
    
    // Test 2: Draft news
    console.log('\n   🔍 Test 2: Draft news');
    const draftNews = await News.find({ isActive: true, status: 'draft' });
    console.log(`      Found: ${draftNews.length} draft news`);
    
    // Test 3: Published news
    console.log('\n   🔍 Test 3: Published news');
    const publishedNews = await News.find({ isActive: true, status: 'publish' });
    console.log(`      Found: ${publishedNews.length} published news`);
    
    // Test 4: News with status filter
    console.log('\n   🔍 Test 4: Status filter "all"');
    const allStatusNews = await News.find({ isActive: true });
    console.log(`      Found: ${allStatusNews.length} news with all statuses`);
    
  } catch (error) {
    console.log(`   ❌ Error testing queries: ${error.message}`);
  }
};

// Test 3: Check News model schema
const checkNewsSchema = () => {
  console.log('\n3️⃣ Checking News model schema...');
  
  try {
    const News = require('./models/News.js');
    console.log('   ✅ News model loaded');
    
    // Check required fields
    const requiredFields = ['title', 'content', 'author'];
    requiredFields.forEach(field => {
      const fieldPath = News.schema.paths[field];
      if (fieldPath && fieldPath.isRequired) {
        console.log(`   ✅ ${field} field is required`);
      } else {
        console.log(`   ❌ ${field} field is not required`);
      }
    });
    
    // Check status field
    const statusField = News.schema.paths.status;
    if (statusField) {
      console.log(`   📝 Status field enum values: ${statusField.enumValues}`);
      console.log(`   📝 Status field default: ${statusField.defaultValue}`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error checking schema: ${error.message}`);
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
    await checkNewsInDatabase();
    await testQueryScenarios();
    checkNewsSchema();
    
    console.log('\n🎯 News Route Test Complete!');
    console.log('\n💡 Key findings:');
    console.log('   1. Check if news exist in database');
    console.log('   2. Check if queries return correct results');
    console.log('   3. Check if schema is correct');
    console.log('\n🚀 Next steps:');
    console.log('   1. If no news in DB, create one manually');
    console.log('   2. Test the actual API endpoint');
    console.log('   3. Check if authentication is working');
    
  } catch (error) {
    console.log('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

// Run tests
runTests();
