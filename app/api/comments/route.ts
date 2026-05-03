import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Comment } from '@/lib/models/Comment'

const COMMENT_STATUSES = ['approved', 'pending', 'rejected'] as const

export async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([])
    }

    await connectToDatabase()
    const slug = request.nextUrl.searchParams.get('slug')
    const status = request.nextUrl.searchParams.get('status') || 'approved'
    const adminPassword = request.headers.get('x-admin-password')
    const isAdmin = Boolean(process.env.ADMIN_PASSWORD && adminPassword === process.env.ADMIN_PASSWORD)

    if (status !== 'all' && !COMMENT_STATUSES.includes(status as (typeof COMMENT_STATUSES)[number])) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    if (!slug) {
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'slug parameter is required' },
          { status: 400 }
        )
      }

      const adminQuery = status === 'all' ? {} : { status }
      const comments = await Comment.find(adminQuery)
        .sort({ createdAt: -1 })
        .limit(500)

      return NextResponse.json(comments)
    }

    const comments = await Comment.find({ postSlug: slug, status })
      .sort({ createdAt: -1 })
      .limit(100)

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Failed to fetch comments:', error)
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
    const { postSlug, author, email, content } = body

    if (!postSlug || !author || !email || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: postSlug, author, email, content' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate content length
    if (content.length < 3 || content.length > 1000) {
      return NextResponse.json(
        { error: 'Comment must be between 3 and 1000 characters' },
        { status: 400 }
      )
    }

    const comment = new Comment({
      postSlug,
      author: author.substring(0, 100),
      email: email.toLowerCase(),
      content: content.substring(0, 1000),
      status: 'approved' // Auto-approve comments
    })

    await comment.save()

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
