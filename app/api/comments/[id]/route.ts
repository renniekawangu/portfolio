import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Comment } from '@/lib/models/Comment'
import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'

async function isAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return await verifyAdminSessionToken(token)
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(null)
    }

    const { id } = await params
    await connectToDatabase()

    const comment = await Comment.findById(id)
    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to fetch comment:', error)
    return NextResponse.json(null)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    const adminAuthenticated = await isAdmin()

    // Basic auth check
    if (!adminAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    await Comment.findByIdAndDelete(id)

    return NextResponse.json({ message: 'Comment deleted' })
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    const adminAuthenticated = await isAdmin()

    // Basic auth check
    if (!adminAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectToDatabase()
    const body = await request.json()
    const { status } = body

    if (!['approved', 'pending', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const comment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to update comment:', error)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}
