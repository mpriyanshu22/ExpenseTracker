const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Generate JWT Token
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Set token in HttpOnly cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,       // 🔥 REQUIRED for HTTPS (Render)
    sameSite: 'none',   // 🔥 REQUIRED for cross-origin
  };

  res.cookie('token', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user (password will be hashed by pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    // Send token in cookie
    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('Register Error:', error);
    
    // Check for database connection errors
    if (error.message && error.message.includes('buffering timed out')) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed. Please check your MONGO_URL in .env file.',
      });
    }

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Handle JWT_SECRET missing
    if (error.message && error.message.includes('JWT_SECRET')) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.',
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Send token in cookie
    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Login Error:', error);
    
    // Handle JWT_SECRET missing
    if (error.message && error.message.includes('JWT_SECRET')) {
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.',
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error',
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // res.cookie('token', 'none', {
  //   expires: new Date(Date.now() + 10 * 1000), // Expires in 10 seconds
  //   httpOnly: true,
  //   secure: isProduction,
  //   sameSite: isProduction ? 'strict' : 'lax', // Match login/register settings
  // });
res.cookie('token', 'none', {
  expires: new Date(Date.now() + 10 * 1000),
  httpOnly: true,
  secure: true,
  sameSite: 'none',
});

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
