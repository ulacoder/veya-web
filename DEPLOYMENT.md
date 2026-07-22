# VEya AI Integration Guide

## 🚀 Quick Setup (5 minutes)

### 1. Deploy Backend to Railway

**Step 1:** Push backend to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/YOUR_USERNAME/veya-backend.git
git push -u origin main
```

**Step 2:** Deploy on Railway
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `veya-backend` repository
4. Railway will auto-detect Dockerfile and deploy

**Step 3:** Upload Model
- Download model from: `C:/Users/Ulagat/veya-dataset/trained_model/veya_model_final.keras`
- Upload to Railway Volume or use Google Drive/Dropbox public link
- Update `MODEL_PATH` in Railway environment variables

**Step 4:** Get Public URL
- Railway provides a public URL like: `https://veya-backend-production.up.railway.app`
- Copy this URL

### 2. Update Vercel Frontend

**Step 1:** Add Environment Variable
```bash
cd ../veya-web
vercel env add MODEL_API_URL
# Paste your Railway URL: https://veya-backend-production.up.railway.app
```

**Step 2:** Deploy
```bash
git add .
git commit -m "Connect real AI model"
git push origin main
```

Vercel auto-deploys on push.

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
