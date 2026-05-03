import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Service } from '@/lib/models/Service'
import { seedInitialData } from '@/lib/seedData'

async function getInitialServices() {
  const { services } = await import('@/app/admin/data/services')
  return services
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(await getInitialServices())
    }

    await connectToDatabase()
    
    // Seed initial data if not already seeded
    await seedInitialData()
    
    const services = await Service.find().sort({ createdAt: -1 })
    return NextResponse.json(services.length > 0 ? services : await getInitialServices())
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return NextResponse.json(await getInitialServices())
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
