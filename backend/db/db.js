const mongoose = require('mongoose');

const db = async () => {
    try {
       
        mongoose.set('strictQuery', false);
        
        // Validate MONGO_URL
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }
        
        if (process.env.MONGO_URL === 'encrypted' || process.env.MONGO_URL.includes('encrypted')) {
            throw new Error('MONGO_URL is set to placeholder value. Please set a valid MongoDB connection string.');
        }
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ Database Connected Successfully');
    } catch (error) {
        console.error('❌ DB Connection Error:', error.message);
        if (error.message.includes('MONGO_URL')) {
            console.error('\n📝 Please update your .env file with a valid MongoDB connection string:');
            console.error('   Example: MONGO_URL=mongodb://localhost:27017/expense-tracker');
            console.error('   Or use MongoDB Atlas: MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker\n');
        }
        // Don't exit - let the server start but operations will fail
    }
}

module.exports = {db}