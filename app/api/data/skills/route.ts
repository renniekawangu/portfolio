import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Skill } from '@/lib/models/Skill'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([])
    }

    await connectToDatabase()
    const skills = await Skill.find().sort({ category: 1, name: 1 })
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Failed to fetch skills:', error)
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

    const skill = new Skill(body)
    await skill.save()

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Failed to create skill:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}
