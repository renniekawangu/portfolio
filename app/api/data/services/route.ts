import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Service } from '@/lib/models/Service'

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([])
    }

    await connectToDatabase()
    const services = await Service.find().sort({ createdAt: -1 })
    return NextResponse.json(services)
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    await connectToDatabase()
    const body = await request.json()

    const service = new Service(body)
    await service.save()

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Failed to create service:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
