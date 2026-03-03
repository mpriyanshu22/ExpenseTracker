// Test database connection
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('🔌 Testing MongoDB connection...\n');
    console.log('Connection string:', process.env.MONGO_URL.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Database Connected Successfully!\n');
    
    // Test if we can create a simple document
    const TestSchema = new mongoose.Schema({ test: String });
    const Test = mongoose.model('Test', TestSchema);
    
    const testDoc = new Test({ test: 'connection-test' });
    await testDoc.save();
    console.log('✅ Can write to database');
    
    await Test.deleteOne({ test: 'connection-test' });
    console.log('✅ Can delete from database');
    
    await mongoose.connection.close();
    console.log('\n✅ All tests passed! Database is working correctly.\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection Error:', error.message);
    console.error('\nPossible issues:');
    console.error('1. Check if MongoDB Atlas IP whitelist includes your IP (0.0.0.0/0 for all)');
    console.error('2. Verify username/password in connection string');
    console.error('3. Check if database name is included in connection string');
    console.error('4. Ensure MongoDB Atlas cluster is running\n');
    process.exit(1);
  }
}

testConnection();
