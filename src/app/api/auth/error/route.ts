import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const error = searchParams.get('error')
  
  return NextResponse.json({
    error: error || 'Unknown error',
    message: 'Authentication error occurred',
    timestamp: new Date().toISOString()
  }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    return NextResponse.json({
      error: body.error || 'Unknown error',
      message: 'Authentication error occurred',
      timestamp: new Date().toISOString()
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json({
      error: 'Invalid request',
      message: 'Failed to process error request',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
