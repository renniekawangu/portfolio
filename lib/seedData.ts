import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/lib/models/Project'
import { Service } from '@/lib/models/Service'
import { Skill } from '@/lib/models/Skill'
import { ContactSettings } from '@/lib/models/ContactSettings'

export async function seedInitialData() {
  if (!process.env.MONGODB_URI) {
    return
  }

  try {
    await connectToDatabase()

    // Check if data already exists
    const projectCount = await Project.countDocuments()
    if (projectCount > 0) {
      return // Data already seeded
    }

    // Import initial data
    const { projects: initialProjects } = await import('@/app/admin/data/projects')
    const { services: initialServices } = await import('@/app/admin/data/services')
    const { skills: initialSkills } = await import('@/app/admin/data/skills')
    const { contactSettings: initialContact } = await import('@/app/admin/data/contact')

    // Seed projects
    if (initialProjects && initialProjects.length > 0) {
      await Project.insertMany(initialProjects)
    }

    // Seed services
    if (initialServices && initialServices.length > 0) {
      await Service.insertMany(initialServices)
    }

    // Seed skills
    if (initialSkills && initialSkills.length > 0) {
      await Skill.insertMany(initialSkills)
    }

    // Seed contact settings
    if (initialContact) {
      await ContactSettings.create(initialContact)
    }

    console.log('Initial data seeded successfully')
  } catch (error) {
    console.error('Failed to seed initial data:', error)
  }
}
