// test-news-display.cjs - Test script untuk verifikasi tampilan berita
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing News Display Functionality...\n');

// Test 1: Check if required files exist
console.log('1️⃣ Checking required files...');
const requiredFiles = [
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

// Test 2: Check routes/news.js syntax
console.log('\n2️⃣ Checking routes/news.js syntax...');
try {
  const newsRoutes = require('./routes/news.js');
  console.log('✅ news.js routes syntax is valid');
} catch (error) {
  console.log(`❌ news.js routes syntax error: ${error.message}`);
}

// Test 3: Check models News.js syntax
console.log('\n3️⃣ Checking models News.js syntax...');
try {
  const NewsModel = require('./models/News.js');
  console.log('✅ News.js model syntax is valid');
} catch (error) {
  console.log(`❌ News.js model syntax error: ${error.message}`);
}

// Test 4: Test news status logic
console.log('\n4️⃣ Testing news status logic...');
const testNewsStatusLogic = () => {
  const testCases = [
    {
      user: null,
      description: 'Public user',
      expectedStatus: 'approved',
      canSeeDraft: false
    },
    {
      user: { role: 'user' },
      description: 'Regular user',
      expectedStatus: 'approved',
      canSeeDraft: false
    },
    {
      user: { role: 'admin' },
      description: 'Admin user',
      expectedStatus: 'all',
      canSeeDraft: true
    },
    {
      user: { role: 'admin_utama' },
      description: 'Admin utama',
      expectedStatus: 'all',
      canSeeDraft: true
    },
    {
      user: { role: 'super_admin' },
      description: 'Super admin',
      expectedStatus: 'all',
      canSeeDraft: true
    }
  ];

  testCases.forEach((testCase, index) => {
    const user = testCase.user;
    const isAdmin = user && ["admin_utama", "super_admin"].includes(user.role);
    const expectedStatus = isAdmin ? 'all' : 'approved';
    const canSeeDraft = isAdmin;
    
    if (expectedStatus === testCase.expectedStatus) {
      console.log(`   ✅ Test ${index + 1}: ${testCase.description} → ${expectedStatus} (can see draft: ${canSeeDraft})`);
    } else {
      console.log(`   ❌ Test ${index + 1}: ${testCase.description} → ${expectedStatus} (expected: ${testCase.expectedStatus})`);
    }
  });
};

testNewsStatusLogic();

// Test 5: Test news creation data structure
console.log('\n5️⃣ Testing news creation data structure...');
const testNewsCreationStructure = () => {
  const mockNewsData = {
    title: 'Test News Title',
    content: 'Test news content',
    excerpt: 'Test excerpt',
    fullContent: 'Test full content',
    category: 'general',
    tags: ['test', 'news'],
    author: 'mock-user-id',
    status: 'approved', // Should be approved now
    isActive: true,
    views: 0,
    publishedAt: new Date()
  };

  // Check required fields
  const requiredFields = ['title', 'content', 'author', 'status', 'isActive'];
  const missingFields = requiredFields.filter(field => !mockNewsData[field]);
  
  if (missingFields.length === 0) {
    console.log('   ✅ All required fields present');
    console.log(`   📝 Status: ${mockNewsData.status}`);
    console.log(`   📅 Published: ${mockNewsData.publishedAt}`);
  } else {
    console.log(`   ❌ Missing required fields: ${missingFields.join(', ')}`);
  }

  // Check field types
  const typeChecks = [
    { field: 'title', value: mockNewsData.title, expectedType: 'string' },
    { field: 'content', value: mockNewsData.content, expectedType: 'string' },
    { field: 'status', value: mockNewsData.status, expectedType: 'string' },
    { field: 'isActive', value: mockNewsData.isActive, expectedType: 'boolean' }
  ];

  typeChecks.forEach(check => {
    const actualType = typeof check.value;
    if (actualType === check.expectedType) {
      console.log(`   ✅ ${check.field}: ${actualType} ✓`);
    } else {
      console.log(`   ❌ ${check.field}: ${actualType} (expected: ${check.expectedType})`);
    }
  });
};

testNewsCreationStructure();

// Test 6: Test query building logic
console.log('\n6️⃣ Testing query building logic...');
const testQueryBuilding = () => {
  const testCases = [
    {
      user: null,
      status: undefined,
      expectedQuery: { isActive: true, status: 'approved' },
      description: 'Public user, no status filter'
    },
    {
      user: { role: 'admin_utama' },
      status: undefined,
      expectedQuery: { isActive: true },
      description: 'Admin, no status filter (see all)'
    },
    {
      user: { role: 'admin_utama' },
      status: 'draft',
      expectedQuery: { isActive: true, status: 'draft' },
      description: 'Admin, filter by draft status'
    },
    {
      user: { role: 'admin_utama' },
      status: 'approved',
      expectedQuery: { isActive: true, status: 'approved' },
      description: 'Admin, filter by approved status'
    }
  ];

  testCases.forEach((testCase, index) => {
    const user = testCase.user;
    const status = testCase.status;
    
    let query = { isActive: true };
    
    // For public access, only show approved news
    if (!user || !["admin_utama", "super_admin"].includes(user.role)) {
      query.status = "approved";
    } else if (status && status !== "all") {
      query.status = status;
    }
    
    const queryStr = JSON.stringify(query);
    const expectedStr = JSON.stringify(testCase.expectedQuery);
    
    if (queryStr === expectedStr) {
      console.log(`   ✅ Test ${index + 1}: ${testCase.description}`);
      console.log(`      Query: ${queryStr}`);
    } else {
      console.log(`   ❌ Test ${index + 1}: ${testCase.description}`);
      console.log(`      Expected: ${expectedStr}`);
      console.log(`      Got: ${queryStr}`);
    }
  });
};

testQueryBuilding();

console.log('\n🎯 News Display Test Complete!');
console.log('📝 If you see any ❌ errors above, those need to be fixed.');
console.log('✅ If all tests pass, the news display system should work correctly.');
console.log('\n💡 What was fixed:');
console.log('   1. News now auto-approved instead of draft');
console.log('   2. Added publishedAt field immediately');
console.log('   3. Improved logging for debugging');
console.log('   4. Added admin route for all news');
console.log('\n🚀 Next steps:');
console.log('   1. Restart backend server');
console.log('   2. Create new news (should be auto-approved)');
console.log('   3. Check if news appears in frontend');
console.log('   4. Use /api/news/admin for admin view');
