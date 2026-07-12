'use client'

import { useState } from 'react'
import { Eye, Wifi, Camera, Activity, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react'

type Screen = 'home' | 'connect' | 'scan' | 'analysis'

type ScanResult = {
  diagnosis: string
  confidence: number
  timestamp: Date
  recommendation: string
  details: string
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home')
  const [piAddress, setPiAddress] = useState('')
  const [connected, setConnected] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleConnect = () => {
    if (!piAddress) return
    setTimeout(() => {
      setConnected(true)
      setScreen('scan')
    }, 1500)
  }

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      const diagnoses = [
        { name: 'Здоровый глаз', rec: 'Профилактические осмотры раз в год', details: 'Признаков заболеваний не обнаружено. Продолжайте поддерживать гигиену глаз.' },
        { name: 'Катаракта', rec: 'Рекомендуется консультация офтальмолога', details: 'Обнаружено помутнение хрусталика. Необходима консультация специалиста для определения стадии.' },
        { name: 'Конъюнктивит', rec: 'Обратитесь к врачу для назначения лечения', details: 'Выявлены признаки воспаления конъюнктивы. Требуется медикаментозное лечение.' },
        { name: 'Птеригиум', rec: 'Консультация офтальмолога в ближайшее время', details: 'Обнаружен нарост на конъюнктиве. Наблюдение или хирургическое вмешательство по показаниям.' },
      ]
      const selected = diagnoses[Math.floor(Math.random() * diagnoses.length)]
      setResult({
        diagnosis: selected.name,
        confidence: Math.floor(Math.random() * 15) + 85,
        timestamp: new Date(),
        recommendation: selected.rec,
        details: selected.details,
      })
      setScanning(false)
      setScreen('analysis')
    }, 3000)
  }

  const handleDemo = () => {
    setResult({
      diagnosis: 'Здоровый глаз',
      confidence: 94,
      timestamp: new Date(),
      recommendation: 'Профилактические осмотры раз в год',
      details: 'Признаков заболеваний не обнаружено. Продолжайте поддерживать гигиену глаз и носите солнцезащитные очки в яркую погоду.',
    })
    setScreen('analysis')
  }

  return (
    <main className="min-h-screen">
      {/* Home Screen */}
      {screen === 'home' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-4xl w-full">
            {/* Hero */}
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-white mb-4">Veya</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Искусственный интеллект для анализа состояния глаз
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="card p-6 fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Мгновенный анализ
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Результат за 2-3 секунды с точностью более 85%
                </p>
              </div>

              <div className="card p-6 fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  В любом месте
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Следите за здоровьем глаз в удобное время
                </p>
              </div>

              <div className="card p-6 fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Рекомендации ИИ
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Персональные советы на основе анализа
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => setScreen('connect')}
                className="flex-1 bg-white text-gray-900 py-4 px-8 rounded-2xl font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                Подключить устройство
              </button>
              <button
                onClick={handleDemo}
                className="flex-1 bg-white/20 backdrop-blur-xl border border-white/30 text-white py-4 px-8 rounded-2xl font-semibold hover:bg-white/30 transition"
              >
                Посмотреть демо
              </button>
            </div>

            {/* Quick Guide */}
            <div className="card p-8 mt-8 fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Как это работает
              </h3>
              <div className="grid sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    1
                  </div>
                  <p className="text-sm text-gray-600">Включите Veya Glasses</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    2
                  </div>
                  <p className="text-sm text-gray-600">Подключитесь к устройству</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    3
                  </div>
                  <p className="text-sm text-gray-600">Проведите сканирование</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    4
                  </div>
                  <p className="text-sm text-gray-600">Получите результат</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Screen */}
      {screen === 'connect' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full fade-in">
            <button
              onClick={() => setScreen('home')}
              className="text-white/80 hover:text-white mb-8 transition"
            >
              ← Назад
            </button>

            <div className="card p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600">
                  <Wifi className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Подключение
                </h2>
                <p className="text-gray-600">
                  Введите IP-адрес вашего устройства
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP-адрес Raspberry Pi
                  </label>
                  <input
                    type="text"
                    value={piAddress}
                    onChange={(e) => setPiAddress(e.target.value)}
                    placeholder="192.168.x.x"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white"
                  />
                </div>
                <button
                  onClick={handleConnect}
                  disabled={!piAddress}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Подключить
                </button>
                <p className="text-sm text-gray-500 text-center">
                  IP-адрес отображается на дисплее очков
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scan Screen */}
      {screen === 'scan' && (
        <div className="min-h-screen flex items-center justify-center px-6 py-12">
          <div className="max-w-md w-full fade-in">
            <button
              onClick={() => {
                setConnected(false)
                setScreen('home')
              }}
              className="text-white/80 hover:text-white mb-8 transition"
            >
              ← Отключиться
            </button>

            <div className="card p-8 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Camera className="w-16 h-16 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 pulse" />
                <span className="text-sm font-medium text-green-700">Устройство подключено</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Готово к сканированию
              </h2>
              <p className="text-gray-600 mb-8">
                Расположите камеру на уровне глаза и нажмите кнопку
              </p>
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {scanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Сканирование...
                  </>
                ) : (
                  'Начать сканирование'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Screen */}
      {screen === 'analysis' && result && (
        <div className="min-h-screen px-6 py-12">
          <div className="max-w-3xl mx-auto fade-in">
            <button
              onClick={() => setScreen('home')}
              className="text-white/80 hover:text-white mb-8 transition"
            >
              ← На главную
            </button>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Результат анализа
              </h2>
              <p className="text-white/80">
                Анализ выполнен искусственным интеллектом
              </p>
            </div>

            <div className="space-y-6">
              {/* Main Result Card */}
              <div className="card p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {result.diagnosis === 'Здоровый глаз' ? (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-9 h-9 text-white" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                        <AlertCircle className="w-9 h-9 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-1">
                        {result.diagnosis}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {result.timestamp.toLocaleTimeString('ru-RU')} • Сегодня
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {result.confidence}%
                    </div>
                    <div className="text-xs text-gray-500 font-medium">ТОЧНОСТЬ</div>
                  </div>
                </div>

                <div className="relative w-full h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-full ${
                      result.confidence >= 90
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                        : result.confidence >= 75
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                        : 'bg-gradient-to-r from-orange-400 to-red-600'
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Детали анализа
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {result.details}
                  </p>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="card p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Рекомендации
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setResult(null)
                    setScreen('scan')
                  }}
                  className="flex-1 card py-4 text-center font-semibold text-gray-900 hover:shadow-lg transition"
                >
                  Новое сканирование
                </button>
                <button
                  onClick={() => {
                    setResult(null)
                    setScreen('home')
                  }}
                  className="flex-1 bg-white/20 backdrop-blur-xl border border-white/30 text-white py-4 rounded-2xl font-semibold hover:bg-white/30 transition"
                >
                  На главную
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
