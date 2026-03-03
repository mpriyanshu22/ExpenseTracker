const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// @desc    Protect routes - Verify JWT from HttpOnly cookie
// @access  Private
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in cookies first (preferred method)
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    // Ignore invalid placeholder values
    if (token === 'none' || token === 'null' || token === 'undefined' || token.trim() === '') {
      token = null;
    }
  }
  // Fallback: Check Authorization header (for backward compatibility)
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists and is valid format
  if (!token || token === 'none' || token === 'null') {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token format first (basic check)
    if (typeof token !== 'string' || token.split('.').length !== 3) {
      // Clear invalid cookie
      res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      });
      return res.status(401).json({
        success: false,
        message: 'Invalid token format',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    next();
  } catch (error) {
    // Only log unexpected errors, not malformed tokens (which are expected for unauthenticated users)
    if (error.name !== 'JsonWebTokenError' && error.name !== 'TokenExpiredError') {
      console.error('Auth Middleware Error:', error);
    }
    
    // Clear invalid/expired cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

