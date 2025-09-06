# 🔐 WanderLust User Login Details Guide

## 👥 Current Users in Database

Your WanderLust application currently has **4 users**:

### 1. **Original User**
- **Username**: `Hdudbejb`
- **Email**: `krishnanema238@gmail.com`
- **Password**: *[Unknown - You created this user]*
- **Created**: Sept 6, 2025

### 2. **Test User**
- **Username**: `testuser`
- **Email**: `test@example.com`
- **Password**: `password123`
- **Created**: Sept 6, 2025

### 3. **Demo User**
- **Username**: `demouser`
- **Email**: `demo@wanderlust.com`
- **Password**: `password123`
- **Created**: Sept 6, 2025

### 4. **Admin User**
- **Username**: `admin`
- **Email**: `admin@wanderlust.com`
- **Password**: `password123`
- **Created**: Sept 6, 2025

---

## 🚪 How to Login

### Option 1: Use Test Credentials
1. Go to: **http://localhost:8080/login**
2. Enter any of these credentials:
   ```
   Username: testuser
   Password: password123
   ```
   OR
   ```
   Username: demouser
   Password: password123
   ```
   OR
   ```
   Username: admin
   Password: password123
   ```

### Option 2: Use Original User (if you remember the password)
```
Username: Hdudbejb
Password: [Your original password]
```

---

## 🔧 How to View User Details (Developer Methods)

### Method 1: Run the View Users Script
```bash
node view_users.js
```
This shows all users with their emails, usernames, and creation dates.

### Method 2: Check Database Directly (if you have MongoDB tools)
```bash
# If mongosh is installed:
mongosh wanderlust --eval "db.users.find().pretty()"
```

### Method 3: Through Your Application
- Users can see their own profile when logged in
- No built-in admin panel (you'd need to create one)

---

## 🆕 Creating New Users

### Through the Web Interface:
1. Go to: **http://localhost:8080/signup**
2. Fill in:
   - Email
   - Username  
   - Password
3. Click "Sign Up"

### Programmatically (for testing):
Run the `create_test_user.js` script to add more test users.

---

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed with salt using `passport-local-mongoose`
- **Session Management**: Uses `express-session` with MongoDB store
- **Authentication**: Users must login to create/edit listings
- **Authorization**: Only listing owners can edit their own listings

---

## 🎯 What Logged-in Users Can Do

✅ **Create new listings** ("Airbnb your home")  
✅ **Edit their own listings**  
✅ **Delete their own listings**  
✅ **Add reviews to any listing**  
✅ **View their profile information**  

❌ **Cannot edit other users' listings**  
❌ **Cannot see other users' passwords**  
❌ **Cannot delete other users' content** (unless they're the owner)

---

## 🚀 Quick Test Login Steps

1. **Open**: http://localhost:8080/login
2. **Enter**: 
   - Username: `testuser`
   - Password: `password123`
3. **Click**: Login
4. **Success**: You should see the listings page with "Add New Listing" option available

---

## 📊 Database Schema

Each user document contains:
```javascript
{
  _id: ObjectId,
  email: String,
  username: String,
  salt: String,        // For password hashing
  hash: String,        // Hashed password
  __v: Number
}
```

**Note**: Passwords are never stored in plain text for security reasons.

---

## 🛠️ Troubleshooting

### If you can't login:
1. **Check if user exists**: Run `node view_users.js`
2. **Try test credentials**: Use `testuser` / `password123`
3. **Create new user**: Go to signup page
4. **Check server logs**: Look for authentication errors

### If you forgot the original password:
1. **Use test accounts**: Login with `testuser` / `password123`
2. **Create new admin**: Sign up with a new account
3. **Reset through database** (requires advanced MongoDB knowledge)

---

## 📝 Notes

- The user `Hdudbejb` was likely created during initial testing
- Test users have simple passwords for demonstration
- In production, enforce strong password policies
- Consider adding password reset functionality
- All users can access all listings, but can only modify their own
