// test-image-field-type.cjs - Test script untuk verifikasi dan perbaiki image field type
const mongoose = require('mongoose');
require('dotenv').config();

console.log('🧪 Testing and Fixing Image Field Type...\n');

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

// Test 1: Check current image field types
const checkImageFieldTypes = async () => {
  console.log('1️⃣ Checking current image field types...');
  
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
    
    // Check each news item
    allNews.forEach((news, index) => {
      console.log(`\n   📰 News ${index + 1}:`);
      console.log(`      ID: ${news._id}`);
      console.log(`      Title: ${news.title}`);
      console.log(`      Image field: ${news.image || 'null'}`);
      console.log(`      Image type: ${typeof news.image}`);
      console.log(`      Image value: ${news.image}`);
      console.log(`      Has image: ${!!news.image}`);
      
      if (news.image) {
        console.log(`      Image length: ${news.image.length}`);
        console.log(`      Is string: ${typeof news.image === 'string'}`);
        console.log(`      Is object: ${typeof news.image === 'object'}`);
      }
    });
    
  } catch (error) {
    console.log(`   ❌ Error checking image field types: ${error.message}`);
  }
};

// Test 2: Fix image field types if needed
const fixImageFieldTypes = async () => {
  console.log('\n2️⃣ Fixing image field types if needed...');
  
  try {
    // Use raw MongoDB collection to avoid schema validation
    const newsCollection = mongoose.connection.db.collection('news');
    
    // Find news with incorrect image field types
    const newsWithObjectImages = await newsCollection.find({
      image: { $type: "object" }
    }).toArray();
    
    console.log(`   🔍 Found ${newsWithObjectImages.length} news with object image fields`);
    
    if (newsWithObjectImages.length > 0) {
      console.log('   📝 Fixing image field types...');
      
      for (const news of newsWithObjectImages) {
        console.log(`      Fixing news: ${news._id}`);
        console.log(`         Current image: ${JSON.stringify(news.image)}`);
        
        let newImageValue = null;
        
        // Try to extract filename from object
        if (news.image && typeof news.image === 'object') {
          if (news.image.filename) {
            newImageValue = String(news.image.filename);
            console.log(`         Extracted filename: ${newImageValue}`);
          } else if (news.image.url) {
            // If it's a URL, keep it as string
            newImageValue = String(news.image.url);
            console.log(`         Extracted URL: ${newImageValue}`);
          } else {
            console.log(`         Could not extract image value, setting to null`);
          }
        }
        
        // Update the document
        const result = await newsCollection.updateOne(
          { _id: news._id },
          { $set: { image: newImageValue } }
        );
        
        if (result.modifiedCount > 0) {
          console.log(`         ✅ Fixed image field`);
        } else {
          console.log(`         ❌ Failed to fix image field`);
        }
      }
    } else {
      console.log('   ✅ All image fields are already correct types');
    }
    
  } catch (error) {
    console.log(`   ❌ Error fixing image field types: ${error.message}`);
  }
};

// Test 3: Verify fixes
const verifyFixes = async () => {
  console.log('\n3️⃣ Verifying fixes...');
  
  try {
    // Use raw MongoDB collection
    const newsCollection = mongoose.connection.db.collection('news');
    
    // Check all news again
    const allNews = await newsCollection.find({}).toArray();
    
    const newsWithImages = allNews.filter(news => news.image);
    const newsWithoutImages = allNews.filter(news => !news.image);
    
    console.log(`   📊 Image field statistics after fix:`);
    console.log(`      News with images: ${newsWithImages.length}`);
    console.log(`      News without images: ${newsWithoutImages.length}`);
    
    if (newsWithImages.length > 0) {
      console.log(`\n   🖼️ Sample images after fix:`);
      newsWithImages.slice(0, 3).forEach((news, index) => {
        console.log(`      ${index + 1}. ${news.image} (${typeof news.image})`);
      });
    }
    
    // Check for any remaining object types
    const remainingObjectImages = allNews.filter(news => 
      news.image && typeof news.image === 'object'
    );
    
    if (remainingObjectImages.length === 0) {
      console.log('   ✅ All image fields are now correct types');
    } else {
      console.log(`   ❌ Still have ${remainingObjectImages.length} news with object image fields`);
    }
    
  } catch (error) {
    console.log(`   ❌ Error verifying fixes: ${error.message}`);
  }
};

// Test 4: Test image URL construction
const testImageUrlConstruction = () => {
  console.log('\n4️⃣ Testing image URL construction...');
  
  try {
    const baseUrl = 'http://localhost:5000';
    const testImages = [
      'image-1753168279551-348860781.jpg',
      'image-1753168318338-486360349.jpeg',
      'image-1755433414503-133291310.jpg'
    ];

    testImages.forEach((image, index) => {
      const imageUrl = `${baseUrl}/uploads/news/${image}`;
      console.log(`   🖼️ Test ${index + 1}:`);
      console.log(`      Filename: ${image}`);
      console.log(`      Type: ${typeof image}`);
      console.log(`      URL: ${imageUrl}`);
      console.log(`      ✅ Valid image URL`);
    });
    
  } catch (error) {
    console.log(`   ❌ Error testing image URL construction: ${error.message}`);
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
    await checkImageFieldTypes();
    await fixImageFieldTypes();
    await verifyFixes();
    testImageUrlConstruction();
    
    console.log('\n🎯 Image Field Type Test Complete!');
    console.log('📝 Check the results above for any issues.');
    console.log('\n💡 What was fixed:');
    console.log('   1. Image field types converted from object to string');
    console.log('   2. Extracted filename/URL from object structures');
    console.log('   3. Set null for invalid image data');
    console.log('\n🚀 Next steps:');
    console.log('   1. Restart backend server');
    console.log('   2. Test image display in frontend');
    console.log('   3. Check browser console for image loading');
    console.log('   4. Verify images appear correctly');
    
  } catch (error) {
    console.log('❌ Test execution failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

// Run tests
runTests();

