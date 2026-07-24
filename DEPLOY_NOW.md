# ✅ VEya Backend — Ready to Deploy

**Created:** 2026-07-23 16:05 PKT  
**Status:** All files prepared, waiting for deployment

---

## 📦 What's Ready

```
C:\Users\Ulagat\veya-web\backend\
├── app/
│   └── main.py              ✅ Model path: models/veya_model_final.keras
├── models/
│   └── veya_model_final.keras  ✅ 26MB trained model
├── requirements.txt         ✅ TensorFlow 2.15, FastAPI
├── Procfile                 ✅ Railway/Heroku ready
├── .gitignore              ✅ Python ignores
└── README.md               ✅ Documentation
```

**Git Status:** ✅ Committed (commit 4a0851b)

---

## 🚀 Deploy Now (3 Minutes)

### Step 1: Create GitHub Repo (30 seconds)

**Direct Link:** https://github.com/new

Fill in:
- Repository name: `veya-backend`
- Description: `VEya AI Eye Disease Detection Backend`
- ✅ Public
- Click "Create repository"

### Step 2: Push Code (30 seconds)

Copy-paste in terminal:
```bash
cd C:\Users\Ulagat\veya-web\backend
git remote add origin https://github.com/ulacoder/veya-backend.git
git push -u origin main
```

If it asks for password, use Personal Access Token from: https://github.com/settings/tokens

### Step 3: Deploy to Railway (2 minutes)

**Direct Link:** https://railway.app/new

1. Click "Deploy from GitHub repo"
2. Select `ulacoder/veya-backend`
3. Wait 3-5 minutes for build
4. Click on service → Settings → Generate Domain
5. Copy URL (e.g., `veya-backend-production-xxxx.up.railway.app`)

### Step 4: Add to Vercel (30 seconds)

**Direct Link:** https://vercel.com/ulacoder/veya-web/settings/environment-variables

1. Click "Add New" → "Environment Variable"
2. Name: `MODEL_API_URL`
3. Value: `https://your-railway-url.railway.app`
4. Select "Production"
5. Click "Save"
6. Go to Deployments → Click latest → "Redeploy"

---

## ✅ Test Production

```bash
# Test backend
curl https://your-railway-url.railway.app/health

# Expected:
{"status":"healthy","model_loaded":true,"classes":["Cataract","Conjunctivitis","Normal","Pterygium"]}

# Test frontend
curl -X POST https://veya-web-zeta.vercel.app/api/analyze \
  -F "file=@eye.jpg"
```

---

## 📱 Live Demo

After deployment: **https://veya-web-zeta.vercel.app**

- Click "Начать сканирование"
- Capture/upload eye photo
- Get AI diagnosis in 2 seconds ✅

---

## 🎯 Quick Links

- **Create GitHub Repo:** https://github.com/new
- **Deploy Railway:** https://railway.app/new
- **Vercel Settings:** https://vercel.com/ulacoder/veya-web/settings/environment-variables
- **Backend Code:** `C:\Users\Ulagat\veya-web\backend`

---

## ⚡ Alternative: Render (No CLI)

If Railway doesn't work:

1. **Deploy:** https://render.com/deploy
2. "New Web Service" → GitHub → `ulacoder/veya-backend`
3. Settings:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Deploy → Copy URL
5. Add to Vercel (same as Step 4 above)

---

## 💾 Current Servers Running

**Local:**
- Backend: http://localhost:8000 ✅
- Frontend: http://localhost:3000 ✅

**Production:**
- Backend: ⏳ Waiting for deploy
- Frontend: https://veya-web-zeta.vercel.app (needs backend URL)

---

## 📊 What You'll Get

After deployment:
- ✅ Production AI backend on Railway
- ✅ Frontend on Vercel connected to backend
- ✅ Real model inference (81% accuracy)
- ✅ Full stack working end-to-end
- ✅ Ready for NASA SEES demo

**Total Time:** ~5 minutes  
**Cost:** $0 (free tier)

---

**Start here:** https://github.com/new → Create `veya-backend` 🚀
