'use client'

import { useState, useEffect } from 'react'
import { Eye, Wifi, Camera, Activity, CheckCircle2, AlertCircle, Clock, Sparkles, Zap, Moon, Sun, Globe } from 'lucide-react'

type Screen = 'home' | 'connect' | 'scan' | 'analysis'
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
      connect: 'Подключить устройство',
      demo: 'Посмотреть демо',
      back: '← Назад',
      disconnect: '← Отключиться',
      startScan: 'Начать сканирование',
      scanning: 'Сканирование...',
      newScan: 'Новое сканирование',
      home: 'На главную',
      connectBtn: 'Подключить',
    },
    guide: {
      title: 'Как это работает',
      step1: 'Включите Veya Glasses',
      step2: 'Подключитесь к устройству',
      step3: 'Проведите сканирование',
      step4: 'Получите результат',
    },
    connect: {
      title: 'Подключение',
      subtitle: 'Введите IP-адрес вашего устройства',
      label: 'IP-адрес Raspberry Pi',
      hint: 'IP-адрес отображается на дисплее очков',
    },
    scan: {
      connected: 'Устройство подключено',
      title: 'Готово к сканированию',
      subtitle: 'Расположите камеру на уровне глаза и нажмите кнопку',
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
      connect: 'Connect Device',
      demo: 'View Demo',
      back: '← Back',
      disconnect: '← Disconnect',
      startScan: 'Start Scanning',
      scanning: 'Scanning...',
      newScan: 'New Scan',
      home: 'Home',
      connectBtn: 'Connect',
    },
    guide: {
      title: 'How it works',
      step1: 'Turn on Veya Glasses',
      step2: 'Connect to device',
      step3: 'Perform scanning',
      step4: 'Get results',
    },
    connect: {
      title: 'Connection',
      subtitle: 'Enter your device IP address',
      label: 'Raspberry Pi IP Address',
      hint: 'IP address is displayed on glasses screen',
    },
    scan: {
      connected: 'Device connected',
      title: 'Ready to scan',
      subtitle: 'Position camera at eye level and press button',
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
  const [piAddress, setPiAddress] = useState('')
  const [connected, setConnected] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([])
  const [connectionError, setConnectionError] = useState(false)

  const t = translations[lang]

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const handleConnect = () => {
    if (!piAddress) return
    setConnectionError(false)
    setTimeout(() => {
      // Simulate connection validation
      const isValidIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(piAddress)
      if (isValidIP) {
        setConnected(true)
        setScreen('scan')
      } else {
        setConnectionError(true)
      }
    }, 1500)
  }

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      const diagnoses = [
        { name: t.diagnoses.healthy, rec: lang === 'ru' ? 'Профилактические осмотры раз в год' : 'Preventive check-ups once a year', details: lang === 'ru' ? 'Признаков заболеваний не обнаружено. Продолжайте поддерживать гигиену глаз.' : 'No signs of disease detected. Continue to maintain eye hygiene.' },
        { name: t.diagnoses.cataract, rec: lang === 'ru' ? 'Рекомендуется консультация офтальмолога' : 'Ophthalmologist consultation recommended', details: lang === 'ru' ? 'Обнаружено помутнение хрусталика. Необходима консультация специалиста для определения стадии.' : 'Lens clouding detected. Specialist consultation needed to determine stage.' },
        { name: t.diagnoses.conjunctivitis, rec: lang === 'ru' ? 'Обратитесь к врачу для назначения лечения' : 'See a doctor for treatment', details: lang === 'ru' ? 'Выявлены признаки воспаления конъюнктивы. Требуется медикаментозное лечение.' : 'Signs of conjunctival inflammation detected. Medical treatment required.' },
        { name: t.diagnoses.pterygium, rec: lang === 'ru' ? 'Консультация офтальмолога в ближайшее время' : 'Ophthalmologist consultation soon', details: lang === 'ru' ? 'Обнаружен нарост на конъюнктиве. Наблюдение или хирургическое вмешательство по показаниям.' : 'Growth on conjunctiva detected. Observation or surgery as indicated.' },
      ]
      const selected = diagnoses[Math.floor(Math.random() * diagnoses.length)]
      const newResult = {
        diagnosis: selected.name,
        confidence: Math.floor(Math.random() * 15) + 85,
        timestamp: new Date(),
        recommendation: selected.rec,
        details: selected.details,
      }
      setResult(newResult)
      setScanHistory(prev => [newResult, ...prev].slice(0, 10)) // Keep last 10 scans
      setScanning(false)
      setScreen('analysis')
    }, 3000)
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
        <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16 fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => setScreen('connect')}
                className={`flex-1 py-5 px-10 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform shadow-2xl ${
                  theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                {t.buttons.connect}
              </button>
              <button
                onClick={handleDemo}
                className="flex-1 bg-blue-600 text-white py-5 px-10 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform glow-blue"
              >
                {t.buttons.demo}
              </button>
            </div>

            {/* Quick Guide */}
            <div className="card-solid p-10 fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className={`text-2xl font-semibold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t.guide.title}
              </h3>
              <div className="grid sm:grid-cols-4 gap-8">
                {[
                  { num: '1', text: t.guide.step1 },
                  { num: '2', text: t.guide.step2 },
                  { num: '3', text: t.guide.step3 },
                  { num: '4', text: t.guide.step4 },
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4 glow-blue">
                      {step.num}
                    </div>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Screen */}
      {screen === 'connect' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
          <div className="max-w-lg w-full fade-in">
            <button
              onClick={() => setScreen('home')}
              className={`mb-10 transition text-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {t.buttons.back}
            </button>

            <div className="card-solid p-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-blue-600 glow-blue">
                  <Wifi className="w-12 h-12 text-white" />
                </div>
                <h2 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {t.connect.title}
                </h2>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.connect.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.connect.label}
                  </label>
                  <input
                    type="text"
                    value={piAddress}
                    onChange={(e) => setPiAddress(e.target.value)}
                    placeholder="192.168.x.x"
                    className={`w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition text-lg ${
                      theme === 'dark'
                        ? 'bg-black border-white/10 text-white placeholder-gray-600'
                        : 'bg-white border-black/10 text-black placeholder-gray-400'
                    }`}
                  />
                </div>
                <button
                  onClick={handleConnect}
                  disabled={!piAddress}
                  className="w-full bg-blue-600 text-white py-5 rounded-xl font-semibold text-lg hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed glow-blue"
                >
                  {t.buttons.connectBtn}
                </button>
                {connectionError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
                    {lang === 'ru' ? 'Ошибка подключения. Проверьте IP-адрес.' : 'Connection error. Check IP address.'}
                  </div>
                )}
                <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {t.connect.hint}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Screen */}
      {screen === 'scan' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
          <div className="max-w-lg w-full fade-in">
            <button
              onClick={() => {
                setConnected(false)
                setScreen('home')
              }}
              className={`mb-10 transition text-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
            >
              {t.buttons.disconnect}
            </button>

            <div className="card-solid p-10 text-center">
              <div className="inline-flex items-center justify-center w-40 h-40 mb-10 rounded-full bg-blue-600 glow-blue">
                <Camera className="w-20 h-20 text-white" />
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-full mb-8">
                <div className="w-3 h-3 rounded-full bg-green-400 pulse" />
                <span className="text-sm font-medium text-green-300">{t.scan.connected}</span>
              </div>
              <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {t.scan.title}
              </h2>
              <p className={`mb-10 text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.scan.subtitle}
              </p>
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full bg-blue-600 text-white py-5 rounded-xl font-semibold text-lg hover:shadow-2xl transition disabled:opacity-50 flex items-center justify-center gap-3 glow-blue"
              >
                {scanning ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    {t.buttons.scanning}
                  </>
                ) : (
                  t.buttons.startScan
                )}
              </button>
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
    </main>
  )
}
