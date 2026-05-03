import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Skill } from '@/lib/models/Skill'
import { seedInitialData } from '@/lib/seedData'

async function getInitialSkills() {
  const { skills } = await import('@/app/admin/data/skills')
  return skills
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(await getInitialSkills())
    }

    await connectToDatabase()
    
    // Seed initial data if not already seeded
    await seedInitialData()
    
    const skills = await Skill.find().sort({ category: 1 })
    return NextResponse.json(skills.length > 0 ? skills : await getInitialSkills())
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    return NextResponse.json(await getInitialSkills())
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
