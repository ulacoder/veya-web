import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const MODEL_API = process.env.MODEL_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('No file in request')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('File received:', file.name, file.size, 'bytes')
    console.log('Forwarding to:', MODEL_API)

    // Forward to Python backend
    const modelFormData = new FormData()
    modelFormData.append('file', file)

    const response = await fetch(`${MODEL_API}/api/analyze`, {
      method: 'POST',
      body: modelFormData,
    })

    console.log('Backend response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend error:', errorText)
      throw new Error(`Model API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Backend result:', result)

    return NextResponse.json({
      diagnosis: result.prediction,
      confidence: Math.round(result.confidence * 100),
      probabilities: result.probabilities,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed', details: String(error) },
      { status: 500 }
    )
  }
}
