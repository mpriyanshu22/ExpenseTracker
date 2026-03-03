# Troubleshooting Authentication Issues

## Common Issues and Solutions

### 1. "Registration failed" or "Login failed" Errors

#### Check Backend Console
Look at your backend terminal for detailed error messages. Common issues:

**Missing JWT_SECRET:**
```
ERROR: JWT_SECRET is not defined in environment variables!
```
**Solution:** Create a `.env` file in the backend folder:
```env
JWT_SECRET=your_super_secret_key_here_min_32_characters
PORT=5000
MONGO_URL=mongodb://localhost:27017/expense-tracker
FRONTEND_URL=http://localhost:3000
```

**Database Connection Error:**
```
DB Connection Error
```
**Solution:** 
- Make sure MongoDB is running
- Check your MONGO_URL in `.env`
- Verify MongoDB is accessible

**CORS Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
- Ensure `credentials: true` is set in CORS config (already done)
- Make sure frontend is using `withCredentials: true` (already done)

### 2. Network Errors

**"Unable to connect to server"**
- Check if backend server is running on port 5000
- Verify backend URL in frontend matches: `http://localhost:5000`
- Check firewall settings

### 3. Cookie Not Being Set

**Symptoms:** Login succeeds but user is not authenticated

**Check:**
1. Browser DevTools → Application → Cookies
2. Look for `token` cookie from `localhost:5000`
3. If missing, check:
   - Browser allows cookies
   - Not in incognito/private mode
   - SameSite cookie settings (should be 'strict' or 'lax' for localhost)

**Solution for SameSite issues:**
If cookies aren't being set, temporarily change in `auth.js`:
```javascript
sameSite: 'lax', // Instead of 'strict'
```

### 4. Testing Steps

1. **Test Backend Health:**
   ```bash
   curl http://localhost:5000/api/v1/health
   ```
   Should return: `{"success":true,"message":"Server is running"}`

2. **Test Registration:**
   ```bash
   curl -X POST http://localhost:5000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
   ```
   Check response and cookies

3. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Network tab
   - Try to register/login
   - Check the request/response
   - Look for error messages

### 5. Environment Variables Checklist

Make sure `.env` file exists in `backend/` folder with:
- ✅ `JWT_SECRET` (required!)
- ✅ `PORT` (optional, defaults to 5000)
- ✅ `MONGO_URL` (required!)
- ✅ `FRONTEND_URL` (optional, defaults to http://localhost:3000)

### 6. Common Mistakes

1. **Wrong API URL:** Frontend calling wrong endpoint
   - Should be: `/api/v1/auth/register` not `/api/v1/register`

2. **Missing cookie-parser:** Backend not parsing cookies
   - Already installed and configured ✅

3. **CORS not allowing credentials:** 
   - Already configured ✅

4. **Frontend not sending credentials:**
   - Already configured with `withCredentials: true` ✅

### 7. Debug Mode

To see more detailed errors, check:
- Backend terminal console
- Browser DevTools → Console
- Browser DevTools → Network tab → Select request → Response

### 8. Quick Fixes

**If nothing works, try:**
1. Restart backend server
2. Clear browser cookies
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check both frontend and backend are running
5. Verify ports: Frontend (3000), Backend (5000)
