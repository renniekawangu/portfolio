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
  
  // Loading state
  loading: boolean
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
  const [loading, setLoading] = useState(true)

  // Load data on mount
  useEffect(() => {
    loadAllData()
  }, [])

  // Save to localStorage whenever data changes (as backup)
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

  const loadAllData = async () => {
    try {
      setLoading(true)
      
      // Load blog posts from static data
      const { blogPosts: initialBlog } = await import('@/app/blog/data')
      setBlogPosts(initialBlog)

      // Load other data from APIs
      const [projectsRes, servicesRes, skillsRes, contactRes] = await Promise.all([
        fetch('/api/data/projects'),
        fetch('/api/data/services'),
        fetch('/api/data/skills'),
        fetch('/api/data/contact')
      ])

      // Load projects from MongoDB or localStorage
      if (projectsRes?.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      } else {
        const savedData = localStorage.getItem('portfolioData')
        if (savedData) {
          const data = JSON.parse(savedData)
          setProjects(data.projects || [])
        } else {
          const { projects: initialProjects } = await import('@/app/admin/data/projects')
          setProjects(initialProjects)
        }
      }

      // Load services
      if (servicesRes?.ok) {
        const servicesData = await servicesRes.json()
        setServices(servicesData)
      } else {
        const savedData = localStorage.getItem('portfolioData')
        if (savedData) {
          const data = JSON.parse(savedData)
          setServices(data.services || [])
        } else {
          const { services: initialServices } = await import('@/app/admin/data/services')
          setServices(initialServices)
        }
      }

      // Load skills
      if (skillsRes?.ok) {
        const skillsData = await skillsRes.json()
        setSkills(skillsData)
      } else {
        const savedData = localStorage.getItem('portfolioData')
        if (savedData) {
          const data = JSON.parse(savedData)
          setSkills(data.skills || [])
        } else {
          const { skills: initialSkills } = await import('@/app/admin/data/skills')
          setSkills(initialSkills)
        }
      }

      // Load contact settings
      if (contactRes?.ok) {
        const contactData = await contactRes.json()
        if (contactData && Object.keys(contactData).length > 0) {
          setContactSettings(contactData)
        }
      } else {
        const savedData = localStorage.getItem('portfolioData')
        if (savedData) {
          const data = JSON.parse(savedData)
          if (data.contactSettings) {
            setContactSettings(data.contactSettings)
          }
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      // Fall back to localStorage
      const savedData = localStorage.getItem('portfolioData')
      if (savedData) {
        const data = JSON.parse(savedData)
        setBlogPosts(data.blogPosts || [])
        setProjects(data.projects || [])
        setServices(data.services || [])
        setSkills(data.skills || [])
        setContactSettings(data.contactSettings || contactSettings)
      }
    } finally {
      setLoading(false)
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

  // Project methods with MongoDB API
  const addProject = async (project: Project) => {
    try {
      const res = await fetch('/api/data/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })

      if (res.ok) {
        const newProject = await res.json()
        setProjects([newProject, ...projects])
      } else {
        // Fallback to local state
        const newProject = {
          ...project,
          id: Math.max(...projects.map(p => p.id), 0) + 1
        }
        setProjects([newProject, ...projects])
      }
    } catch (error) {
      console.error('Failed to add project:', error)
      const newProject = {
        ...project,
        id: Math.max(...projects.map(p => p.id), 0) + 1
      }
      setProjects([newProject, ...projects])
    }
  }

  const updateProject = async (project: Project) => {
    try {
      const res = await fetch(`/api/data/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      })

      if (res.ok) {
        const updatedProject = await res.json()
        setProjects(projects.map(p => p.id === project.id ? updatedProject : p))
      } else {
        setProjects(projects.map(p => p.id === project.id ? project : p))
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      setProjects(projects.map(p => p.id === project.id ? project : p))
    }
  }

  const deleteProject = async (id: number) => {
    try {
      const project = projects.find(p => p.id === id)
      if (!project) return

      await fetch(`/api/data/projects/${id}`, {
        method: 'DELETE'
      })

      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Failed to delete project:', error)
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  // Service methods with MongoDB API
  const addService = async (service: Service) => {
    try {
      const res = await fetch('/api/data/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      })

      if (res.ok) {
        const newService = await res.json()
        setServices([newService, ...services])
      } else {
        const newService = {
          ...service,
          id: Math.max(...services.map(s => s.id), 0) + 1
        }
        setServices([newService, ...services])
      }
    } catch (error) {
      console.error('Failed to add service:', error)
      const newService = {
        ...service,
        id: Math.max(...services.map(s => s.id), 0) + 1
      }
      setServices([newService, ...services])
    }
  }

  const updateService = async (service: Service) => {
    try {
      const res = await fetch(`/api/data/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      })

      if (res.ok) {
        const updatedService = await res.json()
        setServices(services.map(s => s.id === service.id ? updatedService : s))
      } else {
        setServices(services.map(s => s.id === service.id ? service : s))
      }
    } catch (error) {
      console.error('Failed to update service:', error)
      setServices(services.map(s => s.id === service.id ? service : s))
    }
  }

  const deleteService = async (id: number) => {
    try {
      const service = services.find(s => s.id === id)
      if (!service) return

      await fetch(`/api/data/services/${id}`, {
        method: 'DELETE'
      })

      setServices(services.filter(s => s.id !== id))
    } catch (error) {
      console.error('Failed to delete service:', error)
      setServices(services.filter(s => s.id !== id))
    }
  }

  // Skill methods with MongoDB API
  const addSkill = async (skill: Skill) => {
    try {
      const res = await fetch('/api/data/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      })

      if (res.ok) {
        const newSkill = await res.json()
        setSkills([newSkill, ...skills])
      } else {
        const newSkill = {
          ...skill,
          id: Math.max(...skills.map(s => s.id), 0) + 1
        }
        setSkills([newSkill, ...skills])
      }
    } catch (error) {
      console.error('Failed to add skill:', error)
      const newSkill = {
        ...skill,
        id: Math.max(...skills.map(s => s.id), 0) + 1
      }
      setSkills([newSkill, ...skills])
    }
  }

  const updateSkill = async (skill: Skill) => {
    try {
      const res = await fetch(`/api/data/skills/${skill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      })

      if (res.ok) {
        const updatedSkill = await res.json()
        setSkills(skills.map(s => s.id === skill.id ? updatedSkill : s))
      } else {
        setSkills(skills.map(s => s.id === skill.id ? skill : s))
      }
    } catch (error) {
      console.error('Failed to update skill:', error)
      setSkills(skills.map(s => s.id === skill.id ? skill : s))
    }
  }

  const deleteSkill = async (id: number) => {
    try {
      const skill = skills.find(s => s.id === id)
      if (!skill) return

      await fetch(`/api/data/skills/${id}`, {
        method: 'DELETE'
      })

      setSkills(skills.filter(s => s.id !== id))
    } catch (error) {
      console.error('Failed to delete skill:', error)
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  // Contact methods with MongoDB API
  const updateContactSettingsHandler = async (settings: ContactSettings) => {
    try {
      const res = await fetch('/api/data/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (res.ok) {
        const updatedSettings = await res.json()
        setContactSettings(updatedSettings)
      } else {
        setContactSettings(settings)
      }
    } catch (error) {
      console.error('Failed to update contact settings:', error)
      setContactSettings(settings)
    }
  }

  const value: DataContextType = {
    blogPosts,
    projects,
    services,
    skills,
    contactSettings,
    loading,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
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
