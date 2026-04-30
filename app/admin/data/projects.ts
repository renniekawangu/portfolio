export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  image?: string
  status: 'completed' | 'in-progress' | 'planning'
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    link: 'https://github.com',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Security Audit Tool',
    description: 'Automated vulnerability scanning and reporting',
    technologies: ['Node.js', 'React', 'Python', 'Docker'],
    link: 'https://github.com',
    status: 'in-progress'
  }
]
