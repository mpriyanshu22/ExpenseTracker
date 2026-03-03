// Test authentication endpoints
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testAuth() {
  console.log('🧪 Testing Authentication Endpoints...\n');
  
  // Test 1: Health check
  try {
    console.log('1️⃣ Testing health endpoint...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('   ✅ Health check passed:', health.data.message);
  } catch (error) {
    console.error('   ❌ Health check failed:', error.message);
    console.error('   Make sure backend server is running on port 5000');
    return;
  }
  
  // Test 2: Registration endpoint exists
  try {
    console.log('\n2️⃣ Testing registration endpoint...');
    const testData = {
      name: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: 'test123456'
    };
    
    const register = await axios.post(`${BASE_URL}/auth/register`, testData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('   ✅ Registration endpoint works!');
    console.log('   Response:', register.data);
    
    // Test 3: Login with registered user
    console.log('\n3️⃣ Testing login endpoint...');
    const login = await axios.post(`${BASE_URL}/auth/login`, {
      email: testData.email,
      password: testData.password
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('   ✅ Login endpoint works!');
    console.log('   Response:', login.data);
    
    console.log('\n✅ All authentication endpoints are working correctly!\n');
    
  } catch (error) {
    if (error.response) {
      console.error('   ❌ Error:', error.response.status, error.response.data);
      console.error('   Message:', error.response.data?.message || 'Unknown error');
    } else if (error.request) {
      console.error('   ❌ No response received. Is the server running?');
    } else {
      console.error('   ❌ Error:', error.message);
    }
  }
}

testAuth();
