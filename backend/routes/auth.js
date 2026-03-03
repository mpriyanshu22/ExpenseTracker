const router = require('express').Router();
const { registerUser, loginUser, logout, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/v1/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/v1/auth/login
// @desc    Login user
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/v1/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, getMe);

// @route   GET /api/v1/auth/logout
// @desc    Logout user / clear cookie
// @access  Private
router.get('/logout', protect, logout);

module.exports = router;

