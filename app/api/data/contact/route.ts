import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { ContactSettings } from '@/lib/models/ContactSettings'

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({})
    }

    await connectToDatabase()
    const settings = await ContactSettings.findOne()
    return NextResponse.json(settings || {})
  } catch (error) {
    console.error('Failed to fetch contact settings:', error)
    return NextResponse.json({})
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    await connectToDatabase()
    const body = await request.json()

    // Find and update existing, or create new
    let settings = await ContactSettings.findOne()
    if (settings) {
      settings = await ContactSettings.findOneAndUpdate({}, body, { new: true })
    } else {
      settings = new ContactSettings(body)
      await settings.save()
    }

    return NextResponse.json(settings, { status: 201 })
  } catch (error) {
    console.error('Failed to save contact settings:', error)
    return NextResponse.json({ error: 'Failed to save contact settings' }, { status: 500 })
  }
}
