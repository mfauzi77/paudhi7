// test-upload.cjs - Test script untuk upload berita (CommonJS)
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing News Upload System...\n');

// Test 1: Check if upload directories exist
console.log('1️⃣ Checking upload directories...');
const uploadDirs = [
  'uploads',
  'uploads/news',
  'uploads/faq',
  'uploads/images'
];

uploadDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir} exists`);
  } else {
    console.log(`❌ ${dir} missing`);
  }
});

// Test 2: Check if required files exist
console.log('\n2️⃣ Checking required files...');
const requiredFiles = [
  'middleware/upload.js',
  'routes/upload.js',
  'routes/news.js',
  'models/News.js'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Test 3: Check file permissions
console.log('\n3️⃣ Checking file permissions...');
uploadDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      fs.accessSync(dir, fs.constants.W_OK);
      console.log(`✅ ${dir} is writable`);
    } catch (error) {
      console.log(`❌ ${dir} is not writable: ${error.message}`);
    }
  }
});

// Test 4: Check middleware upload.js syntax
console.log('\n4️⃣ Checking middleware upload.js syntax...');
try {
  const uploadMiddleware = require('./middleware/upload.js');
  console.log('✅ upload.js syntax is valid');
  console.log('   - upload function:', typeof uploadMiddleware);
  console.log('   - handleMulterError:', typeof uploadMiddleware.handleMulterError);
  console.log('   - uploadMultiple:', typeof uploadMiddleware.uploadMultiple);
} catch (error) {
  console.log(`❌ upload.js syntax error: ${error.message}`);
}

// Test 5: Check routes upload.js syntax
console.log('\n5️⃣ Checking routes upload.js syntax...');
try {
  const uploadRoutes = require('./routes/upload.js');
  console.log('✅ upload.js routes syntax is valid');
} catch (error) {
  console.log(`❌ upload.js routes syntax error: ${error.message}`);
}

// Test 6: Check routes news.js syntax
console.log('\n6️⃣ Checking routes news.js syntax...');
try {
  const newsRoutes = require('./routes/news.js');
  console.log('✅ news.js routes syntax is valid');
} catch (error) {
  console.log(`❌ news.js routes syntax error: ${error.message}`);
}

// Test 7: Check models News.js syntax
console.log('\n7️⃣ Checking models News.js syntax...');
try {
  const NewsModel = require('./models/News.js');
  console.log('✅ News.js model syntax is valid');
} catch (error) {
  console.log(`❌ News.js model syntax error: ${error.message}`);
}

console.log('\n🎯 Upload System Test Complete!');
console.log('📝 If you see any ❌ errors above, those need to be fixed.');
console.log('✅ If all tests pass, the upload system should work correctly.');
