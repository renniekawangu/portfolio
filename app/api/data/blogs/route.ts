import { connectDB } from '@/lib/mongodb'
import { BlogPost } from '@/app/blog/data'

interface StoredBlogPost extends BlogPost {
  _id?: string
}

export async function GET() {
  try {
    const db = await connectDB()
    const collection = db.collection('blogPosts')
    
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
    const db = await connectDB()
    const collection = db.collection('blogPosts')
    
    const post: StoredBlogPost = await request.json()
    
    // Remove id field as MongoDB will use _id
    const { id, ...postData } = post
    
    const result = await collection.insertOne(postData)
    
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
