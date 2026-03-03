const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

// Validate required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not defined in environment variables!');
  console.error('Please create a .env file with JWT_SECRET=your_secret_key');
  process.exit(1);
}

// Check if JWT_SECRET is a placeholder
if (process.env.JWT_SECRET === 'encrpted' || process.env.JWT_SECRET === 'encrypted' || process.env.JWT_SECRET.length < 10) {
  console.warn('⚠️  WARNING: JWT_SECRET appears to be a placeholder value!');
  console.warn('   Please set a strong, random secret key (at least 32 characters)');
  console.warn('   Example: JWT_SECRET=your_super_secret_random_string_here_min_32_chars');
}

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware (must be before CORS)
app.use(cookieParser());

// CORS configuration - Allow credentials for cookies
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
// app.js
readdirSync('./routes').map((route) => {
    // This prefixing depends on the filename. 
    // If route is 'auth.js', this makes it /api/v1/auth
    const routeName = route.split('.')[0]; 
    app.use(`/api/v1/${routeName}`, require('./routes/' + route));
});

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`✅ Server listening on port: ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/v1/health`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
      console.error(`\n💡 Solutions:`);
      console.error(`   1. Kill the process using port ${PORT}:`);
      console.error(`      Windows: netstat -ano | findstr :${PORT}`);
      console.error(`      Then: taskkill /PID <PID> /F`);
      console.error(`   2. Or change PORT in .env file to a different port\n`);
      process.exit(1);
    } else {
      console.error('❌ Server Error:', err);
      process.exit(1);
    }
  });
};

server();