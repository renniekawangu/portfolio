import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/lib/models/Project'
import { seedInitialData } from '@/lib/seedData'

async function getInitialProjects() {
  const { projects } = await import('@/app/admin/data/projects')
  return projects
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(await getInitialProjects())
    }

    await connectToDatabase()
    
    // Seed initial data if not already seeded
    await seedInitialData()
    
    const projects = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(projects.length > 0 ? projects : await getInitialProjects())
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(await getInitialProjects())
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'MongoDB not configured' }, { status: 500 })
    }

    await connectToDatabase()
    const body = await request.json()

    const project = new Project(body)
    await project.save()

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
