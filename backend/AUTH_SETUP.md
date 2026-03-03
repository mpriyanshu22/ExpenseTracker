# Authentication Setup Guide

This document describes the secure authentication system implemented using JWT tokens stored in HttpOnly cookies.

## Features

- ✅ Secure password hashing with bcrypt
- ✅ JWT tokens stored in HttpOnly cookies (XSS protection)
- ✅ CSRF protection with SameSite cookie attribute
- ✅ Protected routes middleware
- ✅ Secure logout functionality

## Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/expense-tracker

# JWT Configuration (IMPORTANT: Change JWT_SECRET in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure `cookie-parser` is installed:
```bash
npm install cookie-parser
```

## API Endpoints

### Register User
- **POST** `/api/v1/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** Sets HttpOnly cookie with JWT token

### Login User
- **POST** `/api/v1/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** Sets HttpOnly cookie with JWT token

### Logout User
- **GET** `/api/v1/auth/logout`
- **Headers:** Requires authentication (cookie with token)
- **Response:** Clears the token cookie

## Protecting Routes

Use the `protect` middleware to protect private routes:

```javascript
const { protect } = require('../middleware/authMiddleware');

router.get('/protected-route', protect, yourController);
```

The middleware will:
1. Check for token in HttpOnly cookie (or Authorization header as fallback)
2. Verify the token
3. Attach user to `req.user` (without password)
4. Call `next()` if authenticated, or return 401 if not

## Security Features

1. **HttpOnly Cookies**: Prevents JavaScript access, protecting against XSS attacks
2. **Secure Flag**: Only sends cookies over HTTPS in production
3. **SameSite**: Prevents CSRF attacks
4. **Password Hashing**: Uses bcrypt with salt rounds of 10
5. **Password Selection**: Password field is excluded by default from queries

## Frontend Integration

When making requests from the frontend:

1. **Enable credentials** in your HTTP client (axios/fetch):
```javascript
// Axios
axios.defaults.withCredentials = true;

// Fetch
fetch(url, {
  credentials: 'include'
});
```

2. **CORS Configuration**: The backend is configured to accept credentials from the frontend URL specified in `FRONTEND_URL`

3. **Login/Register**: After successful login/register, the cookie will be automatically set by the browser

4. **Logout**: Call the logout endpoint to clear the cookie

## Example Frontend Usage

```javascript
// Login
const login = async (email, password) => {
  const response = await axios.post(
    'http://localhost:5000/api/v1/auth/login',
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

// Protected API call
const getProtectedData = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/v1/protected-route',
    { withCredentials: true }
  );
  return response.data;
};

// Logout
const logout = async () => {
  await axios.get(
    'http://localhost:5000/api/v1/auth/logout',
    { withCredentials: true }
  );
};
```

## Security Best Practices

1. **Never store JWT in localStorage** - Use HttpOnly cookies instead
2. **Change JWT_SECRET** - Use a strong, random secret in production
3. **Use HTTPS** - Always use HTTPS in production
4. **Set appropriate expiration** - Adjust `JWT_EXPIRE` based on your security requirements
5. **Validate input** - Always validate user input on both client and server
6. **Rate limiting** - Consider adding rate limiting to prevent brute force attacks
