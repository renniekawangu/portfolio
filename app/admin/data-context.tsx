'use client'

import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
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
  addBlogPost: (post: BlogPost) => Promise<void>
  updateBlogPost: (post: BlogPost) => Promise<void>
  deleteBlogPost: (id: number | string) => Promise<void>
  
  // Project methods
  addProject: (project: Project) => Promise<void>
  updateProject: (project: Project) => Promise<void>
  deleteProject: (id: number) => Promise<void>
  
  // Service methods
  addService: (service: Service) => Promise<void>
  updateService: (service: Service) => Promise<void>
  deleteService: (id: number) => Promise<void>
  
  // Skill methods
  addSkill: (skill: Skill) => Promise<void>
  updateSkill: (skill: Skill) => Promise<void>
  deleteSkill: (id: number) => Promise<void>
  
  // Contact methods
  updateContactSettings: (settings: ContactSettings) => Promise<void>
  
  // Loading state
  loading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: ''
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [contactSettings, setContactSettings] = useState<ContactSettings>(DEFAULT_CONTACT_SETTINGS)
  const [loading, setLoading] = useState(true)

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Load static data as fallback
      const { blogPosts: initialBlog } = await import('@/app/blog/data')
      const [
        { projects: initialProjects },
        { services: initialServices },
        { skills: initialSkills },
        { contactSettings: initialContactSettings }
      ] = await Promise.all([
        import('@/app/admin/data/projects'),
        import('@/app/admin/data/services'),
        import('@/app/admin/data/skills'),
        import('@/app/admin/data/contact')
      ])

      // Load all data from APIs (including blogs from MongoDB)
      const includeDrafts = pathname?.startsWith('/admin') ? '1' : '0'
      const [blogsRes, projectsRes, servicesRes, skillsRes, contactRes] = await Promise.all([
        fetch(`/api/data/blogs?includeDrafts=${includeDrafts}`),
        fetch('/api/data/projects'),
        fetch('/api/data/services'),
        fetch('/api/data/skills'),
        fetch('/api/data/contact')
      ])

      // Load blog posts from MongoDB or fallback to static
      if (blogsRes?.ok) {
        const blogsData = await blogsRes.json()
        setBlogPosts(Array.isArray(blogsData) && blogsData.length > 0
          ? blogsData
          : initialBlog
        )
      } else {
        setBlogPosts(initialBlog)
      }

      // Load projects from MongoDB or fallback to static
      if (projectsRes?.ok) {
        const projectsData = await projectsRes.json()
        setProjects(Array.isArray(projectsData) && projectsData.length > 0
          ? projectsData
          : initialProjects
        )
      } else {
        setProjects(initialProjects)
      }

      // Load services
      if (servicesRes?.ok) {
        const servicesData = await servicesRes.json()
        setServices(Array.isArray(servicesData) && servicesData.length > 0
          ? servicesData
          : initialServices
        )
      } else {
        setServices(initialServices)
      }

      // Load skills
      if (skillsRes?.ok) {
        const skillsData = await skillsRes.json()
        setSkills(Array.isArray(skillsData) && skillsData.length > 0
          ? skillsData
          : initialSkills
        )
      } else {
        setSkills(initialSkills)
      }

      // Load contact settings
      if (contactRes?.ok) {
        const contactData = await contactRes.json()
        if (contactData && Object.keys(contactData).length > 0) {
          setContactSettings(contactData)
        } else {
          setContactSettings(initialContactSettings || DEFAULT_CONTACT_SETTINGS)
        }
      } else {
        setContactSettings(initialContactSettings || DEFAULT_CONTACT_SETTINGS)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
      // Fall back to static data only
      const { blogPosts: initialBlog } = await import('@/app/blog/data')
      const [
        { projects: initialProjects },
        { services: initialServices },
        { skills: initialSkills },
        { contactSettings: initialContactSettings }
      ] = await Promise.all([
        import('@/app/admin/data/projects'),
        import('@/app/admin/data/services'),
        import('@/app/admin/data/skills'),
        import('@/app/admin/data/contact')
      ])

      setBlogPosts(initialBlog)
      setProjects(initialProjects)
      setServices(initialServices)
      setSkills(initialSkills)
      setContactSettings(initialContactSettings || DEFAULT_CONTACT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }, [pathname])

  // Load data on mount
  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  // Blog methods with MongoDB API
  const addBlogPost = async (post: BlogPost) => {
    try {
      const res = await fetch('/api/data/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })

      if (res.ok) {
        const newPost = await res.json()
        setBlogPosts([newPost, ...blogPosts])
      } else {
        // Fallback to local state
        const nextId = Math.max(...blogPosts.map(p => typeof p.id === 'number' ? p.id : 0), 0) + 1
        const newPost = {
          ...post,
          id: nextId
        }
        setBlogPosts([newPost, ...blogPosts])
      }
    } catch (error) {
      console.error('Failed to add blog post:', error)
      const nextId = Math.max(...blogPosts.map(p => typeof p.id === 'number' ? p.id : 0), 0) + 1
      const newPost = {
        ...post,
        id: nextId
      }
      setBlogPosts([newPost, ...blogPosts])
    }
  }

  const updateBlogPost = async (post: BlogPost) => {
    try {
      const res = await fetch(`/api/data/blogs/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })

      if (res.ok) {
        const updatedPost = await res.json()
        setBlogPosts(blogPosts.map(p => p.id === post.id ? updatedPost : p))
      } else {
        setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p))
      }
    } catch (error) {
      console.error('Failed to update blog post:', error)
      setBlogPosts(blogPosts.map(p => p.id === post.id ? post : p))
    }
  }

  const deleteBlogPost = async (id: number | string) => {
    try {
      const post = blogPosts.find(p => p.id === id)
      if (!post) return

      await fetch(`/api/data/blogs/${id}`, {
        method: 'DELETE'
      })

      setBlogPosts(blogPosts.filter(p => p.id !== id))
    } catch (error) {
      console.error('Failed to delete blog post:', error)
      setBlogPosts(blogPosts.filter(p => p.id !== id))
    }
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
