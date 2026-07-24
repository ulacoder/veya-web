'use client'

import { useState, useRef, useEffect } from 'react'
import { Eye, Camera, Activity, CheckCircle2, AlertCircle, Clock, Sparkles, Zap, Moon, Sun, Globe, Home, Scan, BookOpen } from 'lucide-react'

type Screen = 'home' | 'scan' | 'guide' | 'analysis'
type Theme = 'dark' | 'light'
type Language = 'ru' | 'en'

type ScanResult = {
  diagnosis: string
  confidence: number
  timestamp: Date
  recommendation: string
  details: string
}

// Helper function to format timestamp
const formatTimestamp = (date: Date, lang: Language): string => {
  return date.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const translations = {
  ru: {
    hero: {
      title: 'Veya',
      subtitle: 'ИИ для анализа здоровья глаз',
    },
    features: {
      speed: '2 секунды',
      speedDesc: 'Мгновенный результат с точностью 85%+',
      anywhere: 'Везде',
      anywhereDesc: 'Проверка в любом месте и в любое время',
      recommendations: 'Рекомендации',
      recommendationsDesc: 'Персональные советы на основе анализа',
    },
    buttons: {
      startScan: 'Start Scanning',
      demo: 'View Demo',
      back: '← Back',
      scanning: 'Analyzing...',
      newScan: 'New Scan',
      home: 'Home',
      tabHome: 'Главная',
      tabScan: 'Сканирование',
      tabGuide: 'Инструкция',
    },
    guide: {
      title: 'Как это работает',
      step1: 'Нажмите "Начать сканирование"',
      step2: 'Разрешите доступ к камере',
      step3: 'Сфотографируйте глаз',
      step4: 'Получите AI анализ за 2 секунды',
    },
    analysis: {
      title: 'Результат анализа',
      subtitle: 'Анализ выполнен искусственным интеллектом',
      accuracy: 'Точность',
      details: 'Детали анализа',
      recommendations: 'Рекомендации',
      today: 'Сегодня',
    },
    diagnoses: {
      healthy: 'Здоровый глаз',
      cataract: 'Катаракта',
      conjunctivitis: 'Конъюнктивит',
      pterygium: 'Птеригиум',
    },
  },
  en: {
    hero: {
      title: 'Veya',
      subtitle: 'AI for eye health analysis',
    },
    features: {
      speed: '2 seconds',
      speedDesc: 'Instant result with 85%+ accuracy',
      anywhere: 'Anywhere',
      anywhereDesc: 'Check anytime, anywhere',
      recommendations: 'Recommendations',
      recommendationsDesc: 'Personalized advice based on analysis',
    },
    buttons: {
      startScan: 'Начать сканирование',
      demo: 'Посмотреть демо',
      back: '← Назад',
      scanning: 'Анализ...',
      newScan: 'Новое сканирование',
      home: 'На главную',
      tabHome: 'Home',
      tabScan: 'Scan',
      tabGuide: 'Guide',
    },
    guide: {
      title: 'How it works',
      step1: 'Click "Start Scanning"',
      step2: 'Allow camera access',
      step3: 'Take photo of your eye',
      step4: 'Get AI analysis in 2 seconds',
    },
    analysis: {
      title: 'Analysis Result',
      subtitle: 'Analysis performed by artificial intelligence',
      accuracy: 'Accuracy',
      details: 'Analysis Details',
      recommendations: 'Recommendations',
      today: 'Today',
    },
    diagnoses: {
      healthy: 'Healthy Eye',
      cataract: 'Cataract',
      conjunctivitis: 'Conjunctivitis',
      pterygium: 'Pterygium',
    },
  },
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home')
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Language>('en')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  const t = translations[lang]

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  // Start camera when entering scan screen
  useEffect(() => {
    if (screen === 'scan' && !capturedImage) {
      startCamera()
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [screen])

  const startCamera = async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: 1280, height: 720 }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setError(lang === 'ru'
        ? 'Не удалось получить доступ к камере. Проверьте разрешения.'
        : 'Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const switchCamera = async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    const newMode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(newMode)

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newMode, width: 1280, height: 720 }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setError(lang === 'ru'
        ? 'Не удалось переключить камеру'
        : 'Failed to switch camera')
      console.error('Camera switch error:', err)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setCapturedImage(imageUrl)

      // Stop camera if running
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0)
    const imageUrl = canvas.toDataURL('image/jpeg', 0.95)
    setCapturedImage(imageUrl)

    // Stop camera after capture
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    startCamera()
  }

  const handleStartScan = () => {
    setScreen('scan')
  }

  const handleScan = async () => {
    if (!capturedImage) {
      capturePhoto()
      return
    }

    setScanning(true)
    setError(null)

    try {
      // Convert base64 to blob
      const response = await fetch(capturedImage)
      const blob = await response.blob()

      const formData = new FormData()
      formData.append('file', blob, 'eye.jpg')

      console.log('Sending to API...')
      const apiResponse = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      console.log('API response status:', apiResponse.status)

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text()
        console.error('API error:', errorText)
        throw new Error(`Analysis failed: ${apiResponse.status}`)
      }

      const data = await apiResponse.json()
      console.log('API result:', data)

      // Map diagnosis to translations
      const diagnosisMap: Record<string, string> = {
        'Normal': t.diagnoses.healthy,
        'Cataract': t.diagnoses.cataract,
        'Conjunctivitis': t.diagnoses.conjunctivitis,
        'Pterygium': t.diagnoses.pterygium,
      }

      const recommendationMap: Record<string, { ru: string, en: string, detailsRu: string, detailsEn: string }> = {
        'Normal': {
          ru: 'Профилактические осмотры раз в год',
          en: 'Preventive check-ups once a year',
          detailsRu: 'Признаков заболеваний не обнаружено. Продолжайте поддерживать гигиену глаз.',
          detailsEn: 'No signs of disease detected. Continue to maintain eye hygiene.'
        },
        'Cataract': {
          ru: 'Рекомендуется консультация офтальмолога',
          en: 'Ophthalmologist consultation recommended',
          detailsRu: 'Обнаружено помутнение хрусталика. Необходима консультация специалиста для определения стадии.',
          detailsEn: 'Lens clouding detected. Specialist consultation needed to determine stage.'
        },
        'Conjunctivitis': {
          ru: 'Обратитесь к врачу для назначения лечения',
          en: 'See a doctor for treatment',
          detailsRu: 'Выявлены признаки воспаления конъюнктивы. Требуется медикаментозное лечение.',
          detailsEn: 'Signs of conjunctival inflammation detected. Medical treatment required.'
        },
        'Pterygium': {
          ru: 'Консультация офтальмолога в ближайшее время',
          en: 'Ophthalmologist consultation soon',
          detailsRu: 'Обнаружен нарост на конъюнктиве. Наблюдение или хирургическое вмешательство по показаниям.',
          detailsEn: 'Growth on conjunctiva detected. Observation or surgery as indicated.'
        },
      }

      const recommendation = recommendationMap[data.diagnosis]

      const newResult = {
        diagnosis: diagnosisMap[data.diagnosis] || data.diagnosis,
        confidence: data.confidence,
        timestamp: new Date(),
        recommendation: lang === 'ru' ? recommendation.ru : recommendation.en,
        details: lang === 'ru' ? recommendation.detailsRu : recommendation.detailsEn,
      }

      setResult(newResult)
      setScanHistory(prev => [newResult, ...prev].slice(0, 10))
      setScreen('analysis')

    } catch (error) {
      console.error('Scan error:', error)
      setError(lang === 'ru'
        ? 'Ошибка анализа. Попробуйте ещё раз.'
        : 'Analysis error. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  const handleDemo = () => {
    const demoResult = {
      diagnosis: t.diagnoses.healthy,
      confidence: 94,
      timestamp: new Date(),
      recommendation: lang === 'ru' ? 'Профилактические осмотры раз в год' : 'Preventive check-ups once a year',
      details: lang === 'ru' ? 'Признаков заболеваний не обнаружено. Продолжайте поддерживать гигиену глаз и носите солнцезащитные очки в яркую погоду.' : 'No signs of disease detected. Continue to maintain eye hygiene and wear sunglasses in bright weather.',
    }
    setResult(demoResult)
    setScanHistory(prev => [demoResult, ...prev].slice(0, 10))
    setScreen('analysis')
  }

  return (
    <main className="min-h-screen gradient-bg">
      {/* Theme & Language Toggles */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className={`p-3 rounded-xl backdrop-blur-xl border transition ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-black/5 border-black/10 hover:bg-black/10'
          }`}
        >
          <Globe className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-3 rounded-xl backdrop-blur-xl border transition ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-black/5 border-black/10 hover:bg-black/10'
          }`}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-black" />
          )}
        </button>
      </div>

      {/* Home Screen */}
      {screen === 'home' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 pb-32 relative z-10">
          <div className="max-w-6xl w-full">
            {/* Hero */}
            <div className="text-center mb-16 fade-in">
              <div className="inline-flex items-center justify-center w-28 h-28 mb-8 rounded-3xl bg-blue-600 glow-blue" role="img" aria-label="Veya eye health icon">
                <Eye className="w-14 h-14 text-white" />
              </div>
              <h1 className={`text-7xl md:text-8xl font-bold mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t.hero.title}
              </h1>
              <p className={`text-2xl md:text-3xl leading-relaxed max-w-3xl mx-auto font-light ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.hero.subtitle}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="card p-8 fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 glow-blue">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t.features.speed}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {t.features.speedDesc}
                </p>
              </div>

              <div className="card p-8 fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 glow-blue">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t.features.anywhere}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {t.features.anywhereDesc}
                </p>
              </div>

              <div className="card p-8 fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 glow-blue">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t.features.recommendations}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {t.features.recommendationsDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Screen */}
      {screen === 'scan' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 pb-32 relative z-10">
          <div className="max-w-2xl w-full fade-in">
            <div className="card-solid p-6">
              {/* Camera Preview or Captured Image */}
              <div className="relative mb-6 rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '4/3' }}>
                {!capturedImage ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-64 h-64 border-4 border-blue-500 rounded-full opacity-30"></div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <p className="text-white text-sm bg-black/50 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
                        {lang === 'ru' ? 'Расположите глаз в центре круга' : 'Position your eye in the center circle'}
                      </p>
                    </div>
                    {/* Switch Camera Button */}
                    <button
                      onClick={switchCamera}
                      className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition"
                      title={lang === 'ru' ? 'Переключить камеру' : 'Switch camera'}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                )}
              </div>

              <canvas ref={canvasRef} style={{ display: 'none' }} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm mb-4">
                  {error}
                </div>
              )}

              {/* Controls */}
              {!capturedImage ? (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={capturePhoto}
                    disabled={!stream}
                    className="bg-blue-600 text-white py-5 rounded-xl font-semibold text-lg hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-3 glow-blue"
                  >
                    <Camera className="w-6 h-6" />
                    {lang === 'ru' ? 'Снимок' : 'Capture'}
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`py-5 rounded-xl font-semibold text-lg transition ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-black/10 text-black hover:bg-black/20'
                    } flex items-center justify-center gap-3`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {lang === 'ru' ? 'Галерея' : 'Gallery'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={retakePhoto}
                    className={`py-4 rounded-xl font-semibold text-lg transition ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-black/10 text-black hover:bg-black/20'
                    }`}
                  >
                    {lang === 'ru' ? 'Заново' : 'Retake'}
                  </button>
                  <button
                    onClick={handleScan}
                    disabled={scanning}
                    className="bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-3 glow-blue"
                  >
                    {scanning ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        {t.buttons.scanning}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        {lang === 'ru' ? 'Анализ' : 'Analyze'}
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Tips */}
              <div className={`mt-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                <h3 className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {lang === 'ru' ? 'Советы для точного анализа' : 'Tips for accurate analysis'}
                </h3>
                <ul className={`text-sm space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li>✓ {lang === 'ru' ? 'Используйте заднюю камеру для лучшего качества' : 'Use rear camera for better quality'}</li>
                  <li>✓ {lang === 'ru' ? 'Хорошее освещение без теней' : 'Good lighting without shadows'}</li>
                  <li>✓ {lang === 'ru' ? 'Держите камеру стабильно' : 'Hold camera steady'}</li>
                  <li>✓ {lang === 'ru' ? 'НЕ снимайте экран — только реальные глаза' : 'DON\'T photograph screens — real eyes only'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Screen */}
      {screen === 'guide' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 pb-32 relative z-10">
          <div className="max-w-4xl w-full fade-in">
            <div className="card-solid p-10">
              <h3 className={`text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t.guide.title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { num: '1', text: t.guide.step1 },
                  { num: '2', text: t.guide.step2 },
                  { num: '3', text: t.guide.step3 },
                  { num: '4', text: t.guide.step4 },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-bold text-3xl mx-auto mb-6 glow-blue">
                      {step.num}
                    </div>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Screen */}
      {screen === 'analysis' && result && (
        <div className="min-h-screen px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto fade-in">
            <button
              onClick={() => setScreen('home')}
              className={`mb-10 transition text-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {t.buttons.back}
            </button>

            <div className="text-center mb-12">
              <h2 className={`text-5xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t.analysis.title}
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.analysis.subtitle}
              </p>
            </div>

            <div className="space-y-8">
              {/* Main Result Card */}
              <div className="card-solid p-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6">
                    {result.diagnosis === t.diagnoses.healthy ? (
                      <div className="w-20 h-20 rounded-3xl bg-green-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-11 h-11 text-white" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-3xl bg-orange-600 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-11 h-11 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        {result.diagnosis}
                      </h3>
                      <p className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Clock className="w-4 h-4" />
                        {result.timestamp.toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US')} • {t.analysis.today}
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-6xl font-bold text-gradient mb-1">
                      {result.confidence}%
                    </div>
                    <div className={`text-xs font-semibold tracking-wider uppercase ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {t.analysis.accuracy}
                    </div>
                  </div>
                </div>

                <div className={`relative w-full h-4 rounded-full mb-8 overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-blue-600"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>

                <div className={`backdrop-blur-xl rounded-2xl p-8 border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                  <p className={`text-sm font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    {t.analysis.details}
                  </p>
                  <p className={`leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {result.details}
                  </p>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="card-solid p-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 glow-blue">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                      {t.analysis.recommendations}
                    </h3>
                    <p className={`leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={() => {
                    setResult(null)
                    setScreen('scan')
                  }}
                  className={`flex-1 py-5 text-center font-semibold text-lg rounded-2xl hover:scale-105 transition-transform shadow-2xl ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                  }`}
                >
                  {t.buttons.newScan}
                </button>
                <button
                  onClick={() => {
                    setResult(null)
                    setScreen('home')
                  }}
                  className="flex-1 bg-blue-600 text-white py-5 text-center font-semibold text-lg rounded-2xl hover:scale-105 transition-transform glow-blue"
                >
                  {t.buttons.home}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      {screen !== 'analysis' && (
        <nav className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl border-t ${
          theme === 'dark'
            ? 'bg-black/80 border-white/10'
            : 'bg-white/80 border-black/10'
        }`}>
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex items-center justify-around gap-4">
              <button
                onClick={() => setScreen('home')}
                className={`flex flex-col items-center gap-1.5 flex-1 transition ${
                  screen === 'home'
                    ? 'text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                <Home className={`w-6 h-6 ${screen === 'home' ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{t.buttons.tabHome}</span>
              </button>

              <button
                onClick={() => setScreen('scan')}
                className={`flex flex-col items-center gap-1.5 flex-1 transition ${
                  screen === 'scan'
                    ? 'text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                <Camera className={`w-6 h-6 ${screen === 'scan' ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{t.buttons.tabScan}</span>
              </button>

              <button
                onClick={() => setScreen('guide')}
                className={`flex flex-col items-center gap-1.5 flex-1 transition ${
                  screen === 'guide'
                    ? 'text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                <BookOpen className={`w-6 h-6 ${screen === 'guide' ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{t.buttons.tabGuide}</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </main>
  )
}
