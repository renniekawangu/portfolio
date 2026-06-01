import { connectToDatabase } from '@/lib/mongodb'
import mongoose from 'mongoose'

const getBlogCollection = async () => {
  await connectToDatabase()
  const db = mongoose.connection.db
  if (!db) {
    throw new Error('MongoDB connection is not initialized')
  }
  return db.collection('blogPosts')
}

export async function GET(request: Request) {
  try {
    const collection = await getBlogCollection()

    const { searchParams } = new URL(request.url)
    const includeDrafts = searchParams.get('includeDrafts') === '1'

    const nowIso = new Date().toISOString()
    const filter = includeDrafts
      ? {}
      : {
          $or: [
            { status: { $exists: false } },
            { status: 'published' },
            { status: 'scheduled', publishedAt: { $lte: nowIso } }
          ]
        }

    const posts = await collection.find(filter).sort({ date: -1 }).toArray()
    
    return Response.json(
      posts.map(post => ({
        ...post,
        id: post._id?.toString() || post.id,
        _id: undefined
      }))
    )
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return Response.json([], { status: 200 }) // Return empty array on error
  }
}

export async function POST(request: Request) {
  try {
    const collection = await getBlogCollection()
    
    const post = await request.json()
    
    // Remove id field as MongoDB will use _id
    const { id: _postId, ...postData } = post
    
    const nowIso = new Date().toISOString()
    const result = await collection.insertOne({
      ...postData,
      status: postData.status || 'draft',
      createdAt: postData.createdAt || nowIso,
      updatedAt: nowIso
    })
    
    return Response.json({
      ...postData,
      id: result.insertedId.toString(),
      _id: undefined
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return Response.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
