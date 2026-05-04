import { connectToDatabase } from '@/lib/mongodb'
import { BlogPost } from '@/app/blog/data'
import mongoose from 'mongoose'

// Create blog post schema dynamically
const getBlogSchema = () => {
  const schema = new mongoose.Schema({
    id: Number,
    slug: String,
    title: String,
    excerpt: String,
    date: String,
    category: String,
    content: String,
    readTime: String,
    type: { type: String, enum: ['writeup', 'news', 'story'] },
    pocVideoUrl: String,
    reportUrl: String,
    tags: [String],
    difficulty: String,
    bountyAmount: Number,
    heroImage: String,
    createdAt: { type: Date, default: Date.now }
  })
  return schema
}

const getBlogCollection = async () => {
  await connectToDatabase()
  const db = mongoose.connection.db
  if (!db) {
    throw new Error('MongoDB connection is not initialized')
  }
  return db.collection('blogPosts')
}

export async function GET() {
  try {
    const collection = await getBlogCollection()
    
    const posts = await collection.find({}).sort({ date: -1 }).toArray()
    
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
    const { id, ...postData } = post
    
    const result = await collection.insertOne({
      ...postData,
      createdAt: new Date()
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
