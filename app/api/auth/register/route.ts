import { prisma } from 'server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('role', 'user')

    const baseIdentifikaUrl = process.env.IDENTIFIKA_API_URL

    var user = await fetch(`${baseIdentifikaUrl}/register`, {
      method: 'POST',
      body: formData,
    });

    if (user.status !== 200) {
      return NextResponse.json('An error occurred', {
        status: 400,
        statusText: 'Bad Request',
      })
    }

    return NextResponse.json({
      'status': 'success',
      'message': 'User registered successfully'
    }, { status: 200 })
  } catch (e) {
    console.error(e)
    return NextResponse.json('An error occurred', {
      status: 500,
      statusText: 'Internal Server Error',
    })
  }
}
