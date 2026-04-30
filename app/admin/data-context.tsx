'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BlogPost } from '@/app/blog/data'
import { Project } from '@/app/admin/data/projects'
import { Service } from '@/app/admin/data/services'
import { Skill } from '@/app/admin/data/skills'
import { ContactSettings } from '@/app/admin/data/contact'

interface DataContextType {
  blogPosts: BlogPost[]
  projects: Project[]
  services: Service[]
  skills: Skill[]
  contactSettings: ContactSettings
  
  // Blog methods
  addBlogPost: (post: BlogPost) => void
  updateBlogPost: (post: BlogPost) => void
  deleteBlogPost: (id: number) => void
  
  // Project methods
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: number) => void
  
  // Service methods
  addService: (service: Service) => void
  updateService: (service: Service) => void
  deleteService: (id: number) => void
  
  // Skill methods
  addSkill: (skill: Skill) => void
  updateSkill: (skill: Skill) => void
  deleteSkill: (id: number) => void
  
  // Contact methods
  updateContactSettings: (settings: ContactSettings) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    twitter: ''
  })

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setBlogPosts(data.blogPosts || [])
        setProjects(data.projects || [])
        setServices(data.services || [])
        setSkills(data.skills || [])
        setContactSettings(data.contactSettings || contactSettings)
      } catch (error) {
        console.error('Failed to load portfolio data from localStorage:', error)
        loadInitialData()
      }
    } else {
      loadInitialData()
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data = {
      blogPosts,
      projects,
      services,
      skills,
      contactSettings
    }
    localStorage.setItem('portfolioData', JSON.stringify(data))
  }, [blogPosts, projects, services, skills, contactSettings])

  const loadInitialData = async () => {
    try {
      const { blogPosts: initialBlog } = await import('@/app/blog/data')
      const { projects: initialProjects } = await import('@/app/admin/data/projects')
      const { services: initialServices } = await import('@/app/admin/data/services')
      const { skills: initialSkills } = await import('@/app/admin/data/skills')
      const { contactSettings: initialContact } = await import('@/app/admin/data/contact')

      setBlogPosts(initialBlog)
      setProjects(initialProjects)
      setServices(initialServices)
      setSkills(initialSkills)
      setContactSettings(initialContact)
    } catch (error) {
      console.error('Failed to load initial data:', error)
    }
  }

  // Blog methods
  const addBlogPost = (post: BlogPost) => {
    const newPost = {
      ...post,
      id: Math.max(...blogPosts.map(p => p.id), 0) + 1
    }
    setBlogPosts([newPost, ...blogPosts])
  }

  const updateBlogPost = (post: BlogPost) => {
    setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p))
  }

  const deleteBlogPost = (id: number) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id))
  }

  // Project methods
  const addProject = (project: Project) => {
    const newProject = {
      ...project,
      id: Math.max(...projects.map(p => p.id), 0) + 1
    }
    setProjects([newProject, ...projects])
  }

  const updateProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p))
  }

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  // Service methods
  const addService = (service: Service) => {
    const newService = {
      ...service,
      id: Math.max(...services.map(s => s.id), 0) + 1
    }
    setServices([newService, ...services])
  }

  const updateService = (service: Service) => {
    setServices(services.map(s => s.id === service.id ? service : s))
  }

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id))
  }

  // Skill methods
  const addSkill = (skill: Skill) => {
    const newSkill = {
      ...skill,
      id: Math.max(...skills.map(s => s.id), 0) + 1
    }
    setSkills([newSkill, ...skills])
  }

  const updateSkill = (skill: Skill) => {
    setSkills(skills.map(s => s.id === skill.id ? skill : s))
  }

  const deleteSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id))
  }

  // Contact methods
  const updateContactSettingsHandler = (settings: ContactSettings) => {
    setContactSettings(settings)
  }

  const value: DataContextType = {
    blogPosts,
    projects,
    services,
    skills,
    contactSettings,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    incrementPostViews,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addSkill,
    updateSkill,
    deleteSkill,
    updateContactSettings: updateContactSettingsHandler
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function usePortfolioData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a DataProvider')
  }
  return context
}
