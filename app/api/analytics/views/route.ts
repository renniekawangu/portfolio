import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { View } from '@/lib/models/View'

export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    )
  }
}
