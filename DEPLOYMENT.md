# VEya Production Deployment Guide

**Last Updated:** 2026-07-23  
**Status:** ✅ Model Integrated & Local Testing Complete

## Current Status

✅ **Local Development Working**
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Model: Integrated and tested (81.22% accuracy)
- Test Results: 99.99% Cataract, 100% Normal detection

## 🚀 Quick Deploy (Production)

### Option 1: Railway (Recommended)

**Step 1:** Prepare Model File
```bash
# Copy model to backend directory
mkdir -p backend/models
cp ~/veya-dataset/trained_model/veya_model_final.keras backend/models/
```

**Step 2:** Update Model Path
Edit `backend/app/main.py`:
```python
MODEL_PATH = "models/veya_model_final.keras"  # Change from C:/Users/...
```

**Step 3:** Deploy Backend to Railway
```bash
cd backend
git init
git add .
git commit -m "Add VEya AI model"
git remote add origin https://github.com/YOUR_USERNAME/veya-backend.git
git push -u origin main
```

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `veya-backend` repository
4. Railway auto-deploys
5. Get public URL: `https://veya-backend.railway.app`

**Step 4:** Connect Frontend

1. Go to Vercel dashboard: https://vercel.com
2. Select `veya-web` project
3. Settings → Environment Variables
4. Add:
   ```
   MODEL_API_URL=https://your-backend-url.railway.app
   ```
5. Redeploy from Deployments tab

### Option 2: Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Deploy and get public URL

### Option 3: Heroku

```bash
cd backend
heroku create veya-backend
echo "web: uvicorn app.main:app --host 0.0.0.0 --port \$PORT" > Procfile
git add .
git commit -m "Add Heroku config"
git push heroku main
```

## ✅ Test Live

Visit: https://veya-web-zeta.vercel.app

1. Click "Start Free Scan" or "View Demo"
2. Allow camera access
3. Capture eye photo
4. Get real AI analysis (81% accuracy)

## 🎯 Features Now Live

- ✅ Real MobileNetV2 AI model
- ✅ 4 disease detection: Cataract, Conjunctivitis, Pterygium, Normal
- ✅ Live camera capture
- ✅ Instant results (<2s)
- ✅ Bilingual (RU/EN)
- ✅ Dark/Light theme
- ✅ Mobile responsive

## 🔧 Alternative: Local Testing with Tunnel

If you want to test locally without Railway:

```bash
# Terminal 1: Start backend
cd backend
python app/main.py

# Terminal 2: Expose with localtunnel
npx localtunnel --port 8000

# Copy the URL (e.g., https://abc-123.loca.lt)
# Add to Vercel: MODEL_API_URL=https://abc-123.loca.lt
```

## 📊 Model Info

- Architecture: MobileNetV2
- Training Data: 3,960 images
- Accuracy: 81.22%
- Input: 224x224 RGB
- Classes: 4 (Cataract, Conjunctivitis, Normal, Pterygium)

## 🛠 Troubleshooting

**CORS Error?**
- Backend already has CORS enabled for all origins
- Check Railway logs: `railway logs`

**Model not loading?**
- Verify MODEL_PATH in Railway env vars
- Check model file is accessible
- Railway logs will show loading status

**Slow inference?**
- Railway free tier has CPU limits
- Upgrade to Hobby plan ($5/mo) for better performance

## 📝 Next Steps

1. Upload model to cloud storage (GCS/S3)
2. Add model caching
3. Set up proper domain
4. Add analytics
5. Monitor with Sentry
