# 🚀 Deployment Guide - PAUD HI SISMONEV

## ✅ **SEMUA HARDCODED LOCALHOST SUDAH DIPERBAIKI!**

### **📋 Status Perbaikan:**
- ✅ **Frontend**: Semua hardcoded localhost:5000 sudah menggunakan environment variables
- ✅ **Backend**: Semua hardcoded localhost:5000 sudah menggunakan environment variables
- ✅ **Production Ready**: Fallback menggunakan relative paths untuk production

---

## **🔧 Konfigurasi Environment Variables**

### **Frontend (.env di root):**
```env
# Google Gemini API Configuration
VITE_REACT_APP_GEMINI_API_KEY=AIzaSyCwczBmftSg6LqXGiCWzOh-nVJydjvsAaQ
VITE_REACT_APP_GEMINI_MODEL=gemini-2.0-flash
VITE_REACT_APP_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models

# PAUD HI Configuration
VITE_REACT_APP_WHATSAPP_NUMBER=6281112345678
VITE_REACT_APP_SUPPORT_PHONE=0811-1234-5678
VITE_REACT_APP_EMERGENCY_HOTLINE=129

# API Configuration - Development
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5173

# For Production, change VITE_API_URL to your domain:
# VITE_API_URL=https://yourdomain.com/api
```

### **Backend (backend/.env):**
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/paudhi
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Configuration
FRONTEND_URL=http://localhost:5173
BASE_URL=http://localhost:5000

# For Production, change these URLs to your domain:
# FRONTEND_URL=https://yourdomain.com
# BASE_URL=https://yourdomain.com
```

---

## **🌐 Production Deployment**

### **1. Frontend Deployment:**
```bash
# Update .env for production
VITE_API_URL=https://yourdomain.com/api
VITE_API_BASE_URL=https://yourdomain.com

# Build for production
npm run build

# Deploy dist/ folder to your hosting
```

### **2. Backend Deployment:**
```bash
# Update backend/.env for production
FRONTEND_URL=https://yourdomain.com
BASE_URL=https://yourdomain.com
NODE_ENV=production

# Start production server
npm start
```

---

## **🔍 Perubahan yang Dilakukan:**

### **Frontend:**
- ✅ `src/utils/api.js` - Menggunakan `import.meta.env.DEV` untuk fallback
- ✅ `src/utils/websocket.js` - Production fallback ke relative path
- ✅ `src/utils/debugHelper.js` - Production fallback ke `/api`
- ✅ Semua image components - Production fallback ke relative paths
- ✅ Semua education components - Production fallback ke relative paths

### **Backend:**
- ✅ `backend/server.js` - CORS support untuk port 5173
- ✅ `backend/routes/news.js` - Dynamic BASE_URL
- ✅ `backend/routes/upload.js` - Dynamic BASE_URL
- ✅ Semua scripts - Menggunakan `process.env.MONGODB_URI`

---

## **🎯 Hasil Akhir:**
- ✅ **Development**: Menggunakan localhost:5000 (jika VITE_API_URL tidak set)
- ✅ **Production**: Menggunakan relative paths (jika VITE_API_URL tidak set)
- ✅ **Custom Domain**: Menggunakan VITE_API_URL dari environment variables
- ✅ **No More Hardcoded**: Semua localhost:5000 sudah dinamis

---

## **🚀 Cara Deploy:**

1. **Set Environment Variables** di hosting provider
2. **Build Frontend**: `npm run build`
3. **Deploy Backend** dengan environment variables yang benar
4. **Test API calls** - seharusnya tidak ada lagi localhost:5000

**Aplikasi sekarang 100% production-ready!** 🎉
