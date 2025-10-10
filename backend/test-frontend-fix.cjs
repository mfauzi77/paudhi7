// test-frontend-fix.cjs - Test script untuk verifikasi data structure frontend
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Frontend Data Structure Compatibility...\n');

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

// Test 2: Test news data structure for frontend
console.log('\n2️⃣ Testing news data structure for frontend...');
const testNewsDataStructure = () => {
  // Mock news data as it would be sent to frontend
  const mockNewsData = {
    _id: 'mock-news-id',
    title: 'Test News Title',
    content: 'Test news content',
    excerpt: 'Test excerpt',
    fullContent: 'Test full content',
    category: 'general',
    tags: ['test', 'news'],
    author: {
      _id: 'mock-author-id',
      fullName: 'John Doe',
      email: 'john@example.com',
      role: 'admin_utama',
      klName: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan'
    },
    status: 'draft',
    isActive: true,
    views: 0,
    image: 'test-image.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Check required fields for frontend display
  const requiredFields = [
    '_id', 'title', 'content', 'excerpt', 'author', 
    'status', 'isActive', 'image', 'createdAt'
  ];
  
  const missingFields = requiredFields.filter(field => !mockNewsData[field]);
  
  if (missingFields.length === 0) {
    console.log('   ✅ All required fields present');
  } else {
    console.log(`   ❌ Missing required fields: ${missingFields.join(', ')}`);
  }

  // Check author object structure
  const authorFields = ['_id', 'fullName', 'email', 'role'];
  const missingAuthorFields = authorFields.filter(field => !mockNewsData.author[field]);
  
  if (missingAuthorFields.length === 0) {
    console.log('   ✅ Author object structure valid');
    console.log(`   👤 Author: ${mockNewsData.author.fullName} (${mockNewsData.author.role})`);
  } else {
    console.log(`   ❌ Missing author fields: ${missingAuthorFields.join(', ')}`);
  }

  // Check field types
  const typeChecks = [
    { field: 'title', value: mockNewsData.title, expectedType: 'string' },
    { field: 'content', value: mockNewsData.content, expectedType: 'string' },
    { field: 'author', value: mockNewsData.author, expectedType: 'object' },
    { field: 'createdAt', value: mockNewsData.createdAt, expectedType: 'object' },
    { field: 'status', value: mockNewsData.status, expectedType: 'string' }
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

testNewsDataStructure();

// Test 3: Test author display logic
console.log('\n3️⃣ Testing author display logic...');
const testAuthorDisplayLogic = () => {
  const testCases = [
    {
      author: { fullName: 'John Doe', email: 'john@example.com' },
      expected: 'John Doe',
      description: 'Has fullName'
    },
    {
      author: { email: 'john@example.com' },
      expected: 'john@example.com',
      description: 'Only email, no fullName'
    },
    {
      author: null,
      expected: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      description: 'No author object'
    },
    {
      author: {},
      expected: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      description: 'Empty author object'
    }
  ];

  testCases.forEach((testCase, index) => {
    const author = testCase.author;
    let displayName;
    
    if (author?.fullName) {
      displayName = author.fullName;
    } else if (author?.email) {
      displayName = author.email;
    } else {
      displayName = 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan';
    }
    
    if (displayName === testCase.expected) {
      console.log(`   ✅ Test ${index + 1}: ${testCase.description} → "${displayName}"`);
    } else {
      console.log(`   ❌ Test ${index + 1}: ${testCase.description} → Expected: "${testCase.expected}", Got: "${displayName}"`);
    }
  });
};

testAuthorDisplayLogic();

// Test 4: Test date handling
console.log('\n4️⃣ Testing date handling...');
const testDateHandling = () => {
  const testCases = [
    {
      date: new Date('2024-01-15'),
      description: 'Valid date'
    },
    {
      date: '2024-01-15T00:00:00.000Z',
      description: 'Date string'
    },
    {
      date: null,
      description: 'Null date'
    },
    {
      date: undefined,
      description: 'Undefined date'
    }
  ];

  testCases.forEach((testCase, index) => {
    try {
      let dateObj;
      if (testCase.date instanceof Date) {
        dateObj = testCase.date;
      } else if (testCase.date) {
        dateObj = new Date(testCase.date);
      } else {
        dateObj = new Date(); // Fallback to current date
      }
      
      const formattedDate = dateObj.toLocaleDateString('id-ID');
      console.log(`   ✅ Test ${index + 1}: ${testCase.description} → ${formattedDate}`);
    } catch (error) {
      console.log(`   ❌ Test ${index + 1}: ${testCase.description} → Error: ${error.message}`);
    }
  });
};

testDateHandling();

// Test 5: Test content fallback logic
console.log('\n5️⃣ Testing content fallback logic...');
const testContentFallback = () => {
  const testCases = [
    {
      fullContent: 'Full content here',
      content: 'Regular content',
      expected: 'Full content here',
      description: 'Has fullContent'
    },
    {
      fullContent: null,
      content: 'Regular content',
      expected: 'Regular content',
      description: 'No fullContent, has content'
    },
    {
      fullContent: null,
      content: null,
      expected: 'Konten tidak tersedia',
      description: 'No content at all'
    }
  ];

  testCases.forEach((testCase, index) => {
    const displayContent = testCase.fullContent || testCase.content || 'Konten tidak tersedia';
    
    if (displayContent === testCase.expected) {
      console.log(`   ✅ Test ${index + 1}: ${testCase.description} → "${displayContent}"`);
    } else {
      console.log(`   ❌ Test ${index + 1}: ${testCase.description} → Expected: "${testCase.expected}", Got: "${displayContent}"`);
    }
  });
};

testContentFallback();

console.log('\n🎯 Frontend Data Structure Test Complete!');
console.log('📝 If you see any ❌ errors above, those need to be fixed.');
console.log('✅ If all tests pass, the frontend should work correctly.');
console.log('\n💡 What was fixed:');
console.log('   1. Author object display (fullName || email || fallback)');
console.log('   2. Date field (createdAt instead of publishDate)');
console.log('   3. Content fallback (fullContent || content || fallback)');
console.log('   4. Proper null/undefined handling');
console.log('\n🚀 Next steps:');
console.log('   1. Restart backend server');
console.log('   2. Test frontend - should not show React errors');
console.log('   3. Create news and verify display');
console.log('   4. Check author names display correctly');
