# Veya - AI Eye Disease Detection

[![Deploy with Vercel](https://vercel.com/button)](https://veya-web-zeta.vercel.app)

AI-powered web application for eye disease detection using smart glasses and Raspberry Pi.

## 🎯 Features

- **Real-time Analysis** - Get results in 2-3 seconds with 85%+ accuracy
- **Disease Detection** - Identifies cataracts, conjunctivitis, and pterygium
- **Dark/Light Theme** - Toggle between dark and light modes
- **Bilingual** - Full support for English and Russian
- **Raspberry Pi Integration** - Connect to Veya Glasses via WiFi
- **Privacy First** - All processing happens locally on device

## 🚀 Live Demo

[https://veya-web-zeta.vercel.app](https://veya-web-zeta.vercel.app)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/ulacoder/veya-web.git
cd veya-web

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

No environment variables required for basic functionality. To connect to Raspberry Pi:

1. Turn on Veya Glasses
2. Get IP address from glasses display
3. Enter IP in the app
4. Start scanning

## 📱 Usage

1. **Home Screen** - Overview and demo mode
2. **Connect** - Enter Raspberry Pi IP address
3. **Scan** - Position camera and capture eye image
4. **Analysis** - View AI results and recommendations

## 🎨 Customization

Toggle theme and language using controls in top-right corner:
- 🌙/☀️ Dark/Light theme
- 🌐 English/Russian

## 🏗️ Project Structure

```
veya-web/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main app component
│   └── globals.css     # Global styles
├── public/             # Static assets
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## 🔐 Security

- No API keys stored in code
- `.env*.local` files excluded via `.gitignore`
- All secrets protected from GitHub

## 📄 License

MIT License - feel free to use for your projects

## 👤 Author

**Ulagat**
- GitHub: [@ulacoder](https://github.com/ulacoder)

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

---

Built with ❤️ for accessible eye health screening
