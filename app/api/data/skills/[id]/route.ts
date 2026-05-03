import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectToDatabase } from '@/lib/mongodb'
import { Skill } from '@/lib/models/Skill'

function buildIdQuery(id: string) {
  const queries: Record<string, unknown>[] = []
  const numericId = Number(id)

  if (mongoose.isValidObjectId(id)) {
    queries.push({ _id: id })
  }

  if (!Number.isNaN(numericId)) {
    queries.push({ id: numericId })
  }

  return queries.length > 1 ? { $or: queries } : queries[0] || { _id: id }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(null)
    }

    const { id } = await params
    await connectToDatabase()

    const skill = await Skill.findOne(buildIdQuery(id))
    return NextResponse.json(skill)
  } catch (error) {
    console.error('Failed to fetch skill:', error)
    return NextResponse.json(null)
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    await connectToDatabase()
    const body = await request.json()

    const skill = await Skill.findOneAndUpdate(buildIdQuery(id), body, { new: true })
    return NextResponse.json(skill)
  } catch (error) {
    console.error('Failed to update skill:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    const { id } = await params
    await connectToDatabase()

    await Skill.findOneAndDelete(buildIdQuery(id))
    return NextResponse.json({ message: 'Skill deleted' })
  } catch (error) {
    console.error('Failed to delete skill:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
