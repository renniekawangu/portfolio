export interface Skill {
  id: number
  category: string
  skills: string[]
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export const skills: Skill[] = [
  {
    id: 1,
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    proficiency: 'expert'
  },
  {
    id: 2,
    category: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'],
    proficiency: 'advanced'
  },
  {
    id: 3,
    category: 'Security',
    skills: ['Penetration Testing', 'OWASP', 'SQL Injection', 'XSS'],
    proficiency: 'expert'
  },
  {
    id: 4,
    category: 'DevOps',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    proficiency: 'intermediate'
  }
]
