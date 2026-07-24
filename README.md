# Veya - AI Eye Disease Detection

[![Deploy with Vercel](https://vercel.com/button)](https://veya-web-zeta.vercel.app)

AI-powered web application for eye disease detection using computer vision and deep learning.

## 🎯 Features

- **Real-time Analysis** - Get results in 2-3 seconds with 81%+ accuracy
- **4 Disease Classes** - Detects Cataract, Conjunctivitis, Pterygium, and Normal
- **Mobile Camera Support** - Front/rear camera with live preview
- **Gallery Upload** - Upload existing photos from device
- **Detailed Results** - Confidence scores, probabilities, and medical recommendations
- **Dark/Light Theme** - Toggle between dark and light modes
- **Bilingual** - Full support for English and Russian
- **Privacy First** - No data storage, instant processing

## 🚀 Live Demo

**Production:** [https://veya-web-zeta.vercel.app](https://veya-web-zeta.vercel.app)

**Local Development:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## 🧠 Model Details

- **Architecture:** MobileNetV2 (ImageNet pretrained)
- **Training Date:** 2026-07-18
- **Test Accuracy:** 81.22%
- **AUC:** 93.24%
- **Input:** 224×224 RGB images
- **Classes:** Cataract, Conjunctivitis, Normal, Pterygium

**Per-Class Performance:**
| Class | Precision | Recall | F1-Score |
|-------|-----------|--------|----------|
| Cataract | 64% | 98% | 78% |
| Conjunctivitis | 94% | 75% | 83% |
| Normal | 95% | 89% | 92% |
| Pterygium | 100% | 56% | 72% |

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons

**Backend:**
- FastAPI
- TensorFlow 2.15
- Pillow

**Deployment:**
- Frontend: Vercel
- Backend: (Railway/Render/your choice)

## 📦 Installation

### Frontend

```bash
git clone https://github.com/ulacoder/veya-web.git
cd veya-web
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app/main.py
```

## 🔧 Configuration

### Local Development

1. Start backend: `cd backend && python app/main.py` (runs on :8000)
2. Start frontend: `npm run dev` (runs on :3000)
3. Frontend automatically connects to local backend

### Production Deployment

**Backend:**
1. Deploy to Railway/Render/Heroku
2. Get public URL (e.g., `https://veya-api.railway.app`)

**Frontend:**
1. Add environment variable in Vercel:
   ```
   MODEL_API_URL=https://veya-api.railway.app
   ```
2. Deploy to Vercel

## 📱 Usage

1. **Home Screen** - Overview and demo mode
2. **Start Scanning** - Open camera
3. **Capture/Upload** - Take photo or upload from gallery
4. **Analyze** - Get AI diagnosis in 2 seconds
5. **Results** - View diagnosis, confidence, and recommendations

## 🎨 Customization

- **Theme:** Click moon/sun icon (top-right)
- **Language:** Click globe icon (top-right)

## 🏗️ Project Structure

```
veya-web/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      # API proxy to backend
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main app component
│   └── globals.css           # Global styles
├── backend/
│   ├── app/
│   │   └── main.py           # FastAPI server
│   └── requirements.txt      # Python dependencies
├── public/                   # Static assets
└── package.json              # Node dependencies
```

## 🔐 Security

- No API keys in code
- `.env*.local` files excluded via `.gitignore`
- CORS configured for production domains
- No user data storage

## 🧪 Testing

**Test API Endpoint:**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@eye_photo.jpg"
```

**Expected Response:**
```json
{
  "prediction": "Normal",
  "confidence": 0.95,
  "probabilities": {
    "Cataract": 0.02,
    "Conjunctivitis": 0.01,
    "Normal": 0.95,
    "Pterygium": 0.02
  },
  "model_version": "1.0.0"
}
```

## 📊 Dataset

- **Total Images:** 3,960
- **Sources:** Mendeley, Roboflow HORUS, Kaggle
- **Distribution:**
  - Cataract: 1,257 images
  - Conjunctivitis: 1,293 images
  - Pterygium: 528 images
  - Normal: 882 images

## 🚀 Roadmap

- [ ] Raspberry Pi integration for smart glasses
- [ ] Real-time video analysis
- [ ] Multi-language support (Arabic, Chinese)
- [ ] Scan history with export
- [ ] Improve Pterygium detection accuracy
- [ ] Medical professional dashboard

## 📄 License

MIT License - feel free to use for your projects

## 👤 Author

**Ulagat**
- GitHub: [@ulacoder](https://github.com/ulacoder)
- Email: nurtasulagat@gmail.com

## 🏆 Acknowledgments

- **NASA SEES x Stardance 2026** - Project showcase
- **Dataset Sources:** Mendeley Eye Diseases, Roboflow HORUS, Kaggle
- **Training:** Google Colab with T4 GPU

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

**⚠️ Medical Disclaimer:** This tool is for educational and screening purposes only. Always consult a qualified ophthalmologist for professional medical diagnosis and treatment.

Built with ❤️ for accessible eye health screening worldwide.
