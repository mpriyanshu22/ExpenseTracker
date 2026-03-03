# 🔧 Environment Variables Setup Guide

## ❌ **CRITICAL ISSUE FOUND**

Your current `.env` file has placeholder values that won't work:

```env
MONGO_URL="encrypted"        # ❌ This is NOT a valid MongoDB connection string!
JWT_SECRET="encrpted"        # ❌ This is a placeholder, not a real secret!
```

## ✅ **CORRECT .env FILE**

Replace your `.env` file content with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# Option 1: Local MongoDB (if installed locally)
MONGO_URL=mongodb://localhost:27017/expense-tracker

# Option 2: MongoDB Atlas (cloud - recommended)
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker?retryWrites=true&w=majority

# JWT Configuration
# Generate a secure secret with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_actual_random_secret_key_here_minimum_32_characters_long
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

## 📝 **Step-by-Step Setup**

### 1. **Fix MONGO_URL**

**Option A: Local MongoDB**
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use: `MONGO_URL=mongodb://localhost:27017/expense-tracker`

**Option B: MongoDB Atlas (Free Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace username/password in connection string
6. Use: `MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker`

### 2. **Fix JWT_SECRET**

Generate a secure random secret:

**On Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**On Mac/Linux:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`

**Or manually create one:**
- Minimum 32 characters
- Mix of letters, numbers, and symbols
- Example: `JWT_SECRET=my_super_secret_key_12345_abcdefghijklmnop`

### 3. **Verify Your .env File**

Your `.env` should look like this (with YOUR actual values):

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/expense-tracker
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000
```

## 🧪 **Test Your Setup**

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Check Console Output:**
   - ✅ Should see: "✅ Database Connected Successfully"
   - ✅ Should see: "Server listening on port: 5000"
   - ❌ If you see database errors, check MONGO_URL
   - ❌ If you see JWT_SECRET warnings, update it

3. **Test Health Endpoint:**
   Open browser: `http://localhost:5000/api/v1/health`
   Should return: `{"success":true,"message":"Server is running"}`

## 🐛 **Common Errors & Solutions**

### Error: "DB Connection Error"
- **Cause:** Invalid MONGO_URL
- **Fix:** Update MONGO_URL with valid MongoDB connection string

### Error: "JWT_SECRET is not defined"
- **Cause:** Missing or invalid JWT_SECRET
- **Fix:** Generate and set a proper JWT_SECRET

### Error: "Registration failed" / "Login failed"
- **Cause:** Database not connected or JWT_SECRET invalid
- **Fix:** Check backend console for specific error messages

## 📋 **Quick Checklist**

- [ ] MongoDB is installed/running OR MongoDB Atlas account created
- [ ] `.env` file exists in `backend/` folder
- [ ] `MONGO_URL` is a valid MongoDB connection string (not "encrypted")
- [ ] `JWT_SECRET` is a random string (not "encrpted")
- [ ] `JWT_SECRET` is at least 32 characters long
- [ ] Backend server starts without errors
- [ ] Database connection succeeds (check console)

## 🆘 **Still Having Issues?**

1. Check backend console for error messages
2. Verify MongoDB is running: `mongosh` or check MongoDB service
3. Test database connection manually
4. Check browser console for frontend errors
5. Verify all environment variables are set correctly
