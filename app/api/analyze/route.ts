import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

const MODEL_API = process.env.MODEL_API_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Forward to Python backend
    const modelFormData = new FormData()
    modelFormData.append('file', file)

    const response = await fetch(`${MODEL_API}/api/analyze`, {
      method: 'POST',
      body: modelFormData,
    })

    if (!response.ok) {
      throw new Error(`Model API error: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      diagnosis: result.prediction,
      confidence: Math.round(result.confidence * 100),
      probabilities: result.probabilities,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}
