// test-image-access.cjs - Test script untuk verifikasi akses gambar
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🧪 Testing Image Access and Display...\n');

// Test 1: Check upload directories and files
console.log('1️⃣ Checking upload directories and files...');
const uploadDirs = [
  'uploads',
  'uploads/news',
  'uploads/faq',
  'uploads/images',
  'uploads/pembelajaran'
];

uploadDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir} exists`);
    
    // List files in news directory
    if (dir === 'uploads/news') {
      try {
        const files = fs.readdirSync(dir);
        console.log(`   📁 Files in ${dir}: ${files.length} files`);
        if (files.length > 0) {
          console.log(`   📸 Sample files: ${files.slice(0, 3).join(', ')}`);
          
          // Check first image file
          const firstImage = files[0];
          const imagePath = path.join(dir, firstImage);
          const stats = fs.statSync(imagePath);
          console.log(`   🖼️ First image: ${firstImage} (${(stats.size / 1024).toFixed(2)} KB)`);
        }
      } catch (error) {
        console.log(`   ❌ Error reading ${dir}: ${error.message}`);
      }
    }
  } else {
    console.log(`❌ ${dir} missing`);
  }
});

// Test 2: Test image URL construction
console.log('\n2️⃣ Testing image URL construction...');
const testImageUrls = () => {
  const baseUrl = 'http://localhost:5000';
  const testImages = [
    'image-1753168279551-348860781.jpg',
    'image-1753168318338-486360349.jpeg',
    'image-1755433414503-133291310.jpg'
  ];

  testImages.forEach(image => {
    const imagePath = path.join('uploads/news', image);
    const fullUrl = `${baseUrl}/uploads/news/${image}`;
    
    if (fs.existsSync(imagePath)) {
      console.log(`   ✅ ${image} exists`);
      console.log(`      Path: ${imagePath}`);
      console.log(`      URL: ${fullUrl}`);
      
      // Check file size
      const stats = fs.statSync(imagePath);
      console.log(`      Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`   ❌ ${image} missing`);
    }
  });
};

testImageUrls();

// Test 3: Test HTTP access to images
console.log('\n3️⃣ Testing HTTP access to images...');
const testHttpAccess = () => {
  const testImage = 'image-1753168279551-348860781.jpg';
  const imageUrl = `http://localhost:5000/uploads/news/${testImage}`;
  
  console.log(`   🔗 Testing access to: ${imageUrl}`);
  
  const req = http.get(imageUrl, (res) => {
    console.log(`   📡 Response status: ${res.statusCode}`);
    console.log(`   📋 Response headers:`, {
      'content-type': res.headers['content-type'],
      'content-length': res.headers['content-length'],
      'cache-control': res.headers['cache-control'],
      'access-control-allow-origin': res.headers['access-control-allow-origin']
    });
    
    if (res.statusCode === 200) {
      console.log('   ✅ Image accessible via HTTP');
    } else {
      console.log('   ❌ Image not accessible via HTTP');
    }
  });
  
  req.on('error', (error) => {
    console.log(`   ❌ HTTP request failed: ${error.message}`);
  });
  
  req.setTimeout(5000, () => {
    console.log('   ⏰ Request timeout');
    req.destroy();
  });
};

// Test 4: Check News model image field
console.log('\n4️⃣ Checking News model image field...');
const testNewsModel = () => {
  try {
    const News = require('./models/News.js');
    console.log('   ✅ News model loaded successfully');
    
    // Check schema
    const imageField = News.schema.paths.image;
    if (imageField) {
      console.log(`   📝 Image field type: ${imageField.instance}`);
      console.log(`   📝 Image field required: ${imageField.isRequired}`);
      console.log(`   📝 Image field default: ${imageField.defaultValue}`);
    } else {
      console.log('   ❌ Image field not found in schema');
    }
  } catch (error) {
    console.log(`   ❌ Error loading News model: ${error.message}`);
  }
};

testNewsModel();

// Test 5: Check server configuration
console.log('\n5️⃣ Checking server configuration...');
const checkServerConfig = () => {
  try {
    const serverPath = './server.js';
    if (fs.existsSync(serverPath)) {
      const serverContent = fs.readFileSync(serverPath, 'utf8');
      
      // Check for static file serving
      if (serverContent.includes('express.static') && serverContent.includes('uploads')) {
        console.log('   ✅ Static file serving configured for uploads');
      } else {
        console.log('   ❌ Static file serving not configured for uploads');
      }
      
      // Check for CORS headers
      if (serverContent.includes('Access-Control-Allow-Origin')) {
        console.log('   ✅ CORS headers configured');
      } else {
        console.log('   ❌ CORS headers not configured');
      }
      
      // Check for explicit image routes
      if (serverContent.includes('/uploads/news/')) {
        console.log('   ✅ Explicit image routes configured');
      } else {
        console.log('   ❌ Explicit image routes not configured');
      }
    } else {
      console.log('   ❌ Server.js not found');
    }
  } catch (error) {
    console.log(`   ❌ Error checking server config: ${error.message}`);
  }
};

checkServerConfig();

// Test 6: Simulate frontend image access
console.log('\n6️⃣ Simulating frontend image access...');
const simulateFrontendAccess = () => {
  const mockNewsData = [
    {
      _id: 'news-1',
      title: 'Test News 1',
      image: 'image-1753168279551-348860781.jpg',
      author: { fullName: 'Test Author' },
      createdAt: new Date()
    },
    {
      _id: 'news-2',
      title: 'Test News 2',
      image: null,
      author: { fullName: 'Test Author 2' },
      createdAt: new Date()
    }
  ];

  const baseUrl = 'http://localhost:5000';
  
  mockNewsData.forEach((news, index) => {
    console.log(`   📰 News ${index + 1}: ${news.title}`);
    
    if (news.image) {
      const imageUrl = `${baseUrl}/uploads/news/${news.image}`;
      const imagePath = path.join('uploads/news', news.image);
      
      if (fs.existsSync(imagePath)) {
        console.log(`      ✅ Image exists: ${news.image}`);
        console.log(`      🔗 Image URL: ${imageUrl}`);
        
        // Check if URL is accessible
        const req = http.get(imageUrl, (res) => {
          if (res.statusCode === 200) {
            console.log(`      🌐 Image accessible via URL`);
          } else {
            console.log(`      ❌ Image not accessible via URL (${res.statusCode})`);
          }
        });
        
        req.on('error', (error) => {
          console.log(`      ❌ URL access failed: ${error.message}`);
        });
        
        req.setTimeout(3000, () => {
          req.destroy();
        });
      } else {
        console.log(`      ❌ Image file missing: ${news.image}`);
      }
    } else {
      console.log(`      📭 No image for this news`);
    }
  });
};

// Run HTTP tests after a delay
setTimeout(() => {
  testHttpAccess();
  simulateFrontendAccess();
}, 1000);

console.log('\n🎯 Image Access Test Complete!');
console.log('📝 If you see any ❌ errors above, those need to be fixed.');
console.log('✅ If all tests pass, the image access should work correctly.');
console.log('\n💡 Common issues and solutions:');
console.log('   1. Server not running - Start backend server');
console.log('   2. Wrong port - Check if server runs on port 5000');
console.log('   3. CORS issues - Check CORS configuration');
console.log('   4. File permissions - Check upload directory permissions');
console.log('   5. Image field mapping - Check how image field is saved');
console.log('\n🚀 Next steps:');
console.log('   1. Ensure backend server is running on port 5000');
console.log('   2. Check browser console for CORS errors');
console.log('   3. Verify image URLs in browser network tab');
console.log('   4. Test direct image URL access in browser');
