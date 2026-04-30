import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { View } from '@/lib/models/View'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB URI not configured, returning empty stats')
      return NextResponse.json({})
    }

    await connectToDatabase()
    const slug = request.nextUrl.searchParams.get('slug')

    if (slug) {
      // Get views for specific post
      const count = await View.countDocuments({ slug })
      return NextResponse.json({
        slug,
        views: count,
        timestamp: new Date().toISOString()
      })
    }

    // Get all stats
    const views = await View.aggregate([
      {
        $group: {
          _id: '$slug',
          count: { $sum: 1 }
        }
      }
    ])

    const stats: { [slug: string]: number } = {}
    views.forEach(v => {
      stats[v._id] = v.count
    })

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    // Return empty stats instead of error, so UI doesn't break
    return NextResponse.json({})
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB URI not configured, view not recorded')
      return NextResponse.json({
        slug: 'unknown',
        views: 0,
        message: 'Analytics not configured'
      })
    }

    await connectToDatabase()
    const body = await request.json()
    const { slug } = body

    if (!slug) {
      return NextResponse.json(
        { error: 'slug is required' },
        { status: 400 }
      )
    }

    // Create new view record
    const view = new View({
      slug,
      timestamp: new Date(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || undefined
    })

    await view.save()

    // Return updated count
    const count = await View.countDocuments({ slug })
    return NextResponse.json({
      slug,
      views: count,
      message: 'View recorded'
    })
  } catch (error) {
    console.error('Failed to record view:', error)
    // Return success anyway so UI doesn't break
    return NextResponse.json({
      slug: 'unknown',
      views: 0,
      message: 'View recording failed gracefully'
    })
  }
}
