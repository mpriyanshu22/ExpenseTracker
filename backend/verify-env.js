// Quick script to verify .env configuration
require('dotenv').config();

console.log('\n🔍 Checking Environment Variables...\n');

// Check JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET: NOT SET');
} else if (process.env.JWT_SECRET === 'encrpted' || process.env.JWT_SECRET === 'encrypted') {
  console.warn('⚠️  JWT_SECRET: Set to placeholder value ("encrpted" or "encrypted")');
  console.warn('   Please generate a real secret key');
} else if (process.env.JWT_SECRET.length < 10) {
  console.warn('⚠️  JWT_SECRET: Too short (less than 10 characters)');
  console.warn('   Recommended: At least 32 characters');
} else {
  console.log('✅ JWT_SECRET: Set (length: ' + process.env.JWT_SECRET.length + ' characters)');
}

// Check MONGO_URL
if (!process.env.MONGO_URL) {
  console.error('❌ MONGO_URL: NOT SET');
} else if (process.env.MONGO_URL === 'encrypted' || process.env.MONGO_URL.includes('encrypted')) {
  console.error('❌ MONGO_URL: Set to placeholder value ("encrypted")');
  console.error('   Please set a valid MongoDB connection string');
} else if (process.env.MONGO_URL.startsWith('mongodb://') || process.env.MONGO_URL.startsWith('mongodb+srv://')) {
  // Mask password in output
  const maskedUrl = process.env.MONGO_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
  console.log('✅ MONGO_URL: Valid format detected');
  console.log('   ' + maskedUrl);
} else {
  console.warn('⚠️  MONGO_URL: Format may be incorrect');
  console.warn('   Should start with mongodb:// or mongodb+srv://');
}

// Check PORT
if (process.env.PORT) {
  console.log('✅ PORT: ' + process.env.PORT);
} else {
  console.log('ℹ️  PORT: Not set (will default to 5000)');
}

// Check NODE_ENV
if (process.env.NODE_ENV) {
  console.log('✅ NODE_ENV: ' + process.env.NODE_ENV);
} else {
  console.log('ℹ️  NODE_ENV: Not set (will default to development)');
}

// Check FRONTEND_URL
if (process.env.FRONTEND_URL) {
  console.log('✅ FRONTEND_URL: ' + process.env.FRONTEND_URL);
} else {
  console.log('ℹ️  FRONTEND_URL: Not set (will default to http://localhost:3000)');
}

console.log('\n📋 Summary:');
const hasJWT = process.env.JWT_SECRET && 
               process.env.JWT_SECRET !== 'encrpted' && 
               process.env.JWT_SECRET !== 'encrypted' &&
               process.env.JWT_SECRET.length >= 10;

const hasMongo = process.env.MONGO_URL && 
                 process.env.MONGO_URL !== 'encrypted' &&
                 !process.env.MONGO_URL.includes('encrypted') &&
                 (process.env.MONGO_URL.startsWith('mongodb://') || process.env.MONGO_URL.startsWith('mongodb+srv://'));

if (hasJWT && hasMongo) {
  console.log('✅ All critical variables are properly configured!\n');
} else {
  console.log('❌ Some variables need to be fixed:\n');
  if (!hasJWT) {
    console.log('   - JWT_SECRET needs to be set to a real value');
  }
  if (!hasMongo) {
    console.log('   - MONGO_URL needs to be set to a valid MongoDB connection string\n');
  }
}
