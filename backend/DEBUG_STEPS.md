# 🐛 Debug Steps for Registration/Login Issues

## ✅ **Verified Working:**
- ✅ Environment variables are correctly configured
- ✅ Database connection is working
- ✅ MongoDB Atlas is accessible

## 🔍 **Next Steps to Debug:**

### Step 1: Start Backend Server
```bash
cd backend
npm start
```

**Check console output for:**
- ✅ "✅ Database Connected Successfully"
- ✅ "Server listening on port: 5000"
- ❌ Any error messages?

### Step 2: Test Health Endpoint
Open in browser: `http://localhost:5000/api/v1/health`

**Expected:** `{"success":true,"message":"Server is running"}`

### Step 3: Check Browser Console
1. Open your frontend app
2. Open DevTools (F12)
3. Go to **Console** tab
4. Try to register/login
5. **Look for errors** - copy them here

### Step 4: Check Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Try to register/login
4. Click on the failed request
5. Check:
   - **Status Code** (should be 200 or 201 for success)
   - **Response** tab - what error message?
   - **Headers** - is `withCredentials` being sent?

### Step 5: Test with Postman/Thunder Client
Test the registration endpoint directly:

**POST** `http://localhost:5000/api/v1/auth/register`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "test123456"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "test@test.com"
  }
}
```

### Step 6: Common Issues & Fixes

#### Issue: "Registration failed" / "Login failed"
**Check:**
1. Is backend server running? (Check terminal)
2. Is it on port 5000? (Check console output)
3. Any errors in backend console?
4. Check browser Network tab for actual error

#### Issue: CORS Error
**Symptoms:** "Access to XMLHttpRequest blocked by CORS policy"
**Fix:** Already configured, but verify:
- Backend CORS allows `http://localhost:3000`
- Frontend is using `withCredentials: true` ✅ (already done)

#### Issue: Cookie Not Being Set
**Check:**
1. Browser DevTools → Application → Cookies
2. Look for `token` cookie from `localhost:5000`
3. If missing:
   - Check if `sameSite: 'lax'` is set (already done)
   - Check if `secure: false` in development (already done)
   - Try different browser
   - Clear cookies and try again

#### Issue: Network Error
**Symptoms:** "Unable to connect to server"
**Fix:**
- Verify backend is running
- Check if port 5000 is available
- Check firewall settings

## 📋 **Quick Checklist:**

- [ ] Backend server is running (`npm start` in backend folder)
- [ ] Backend shows "Database Connected Successfully"
- [ ] Backend shows "Server listening on port: 5000"
- [ ] Health endpoint works: `http://localhost:5000/api/v1/health`
- [ ] Frontend is running on port 3000
- [ ] Browser console shows no errors
- [ ] Network tab shows request being made
- [ ] Response in Network tab shows actual error (if any)

## 🆘 **If Still Not Working:**

**Share these details:**
1. Backend console output (when you try to register/login)
2. Browser console errors
3. Network tab response (screenshot or copy error message)
4. Status code from Network tab

This will help identify the exact issue!
