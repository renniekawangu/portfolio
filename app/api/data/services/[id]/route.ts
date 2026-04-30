import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Service } from '@/lib/models/Service'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(null)
    }

    const { id } = await params
    await connectToDatabase()

    const service = await Service.findById(id)
    return NextResponse.json(service)
  } catch (error) {
    console.error('Failed to fetch service:', error)
    return NextResponse.json(null)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    await connectToDatabase()
    const body = await request.json()

    const service = await Service.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(service)
  } catch (error) {
    console.error('Failed to update service:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    await connectToDatabase()

    await Service.findByIdAndDelete(id)
    return NextResponse.json({ message: 'Service deleted' })
  } catch (error) {
    console.error('Failed to delete service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
