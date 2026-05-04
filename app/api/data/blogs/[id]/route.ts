import { connectToDatabase } from '@/lib/mongodb'
import { BlogPost } from '@/app/blog/data'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

interface StoredBlogPost extends BlogPost {
  _id?: string | ObjectId
}

const getBlogCollection = async () => {
  await connectToDatabase()
  const db = mongoose.connection.db
  if (!db) {
    throw new Error('MongoDB connection is not initialized')
  }
  return db.collection('blogPosts')
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const collection = await getBlogCollection()
    
    // Try to find by ObjectId first, then by id field
    let post = await collection.findOne({ _id: new ObjectId(id) })
    if (!post) {
      post = await collection.findOne({ id: parseInt(id) })
    }
    
    if (!post) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return Response.json({
      ...post,
      id: post._id?.toString() || post.id,
      _id: undefined
    })
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return Response.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const collection = await getBlogCollection()
    
    const postData: StoredBlogPost = await request.json()
    const { id: _id, _id: __id, ...updateData } = postData
    
    // Try to update by ObjectId first, then by id field
    let result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )
    
    if (result.matchedCount === 0) {
      result = await collection.updateOne(
        { id: parseInt(id) },
        { $set: updateData }
      )
    }
    
    if (result.matchedCount === 0) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return Response.json({
      ...postData,
      id: id,
      _id: undefined
    })
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return Response.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const collection = await getBlogCollection()
    
    // Try to delete by ObjectId first, then by id field
    let result = await collection.deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      result = await collection.deleteOne({ id: parseInt(id) })
    }
    
    if (result.deletedCount === 0) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 })
    }
    
    return Response.json({ success: true })
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return Response.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
