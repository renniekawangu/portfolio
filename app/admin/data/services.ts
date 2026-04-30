export interface Service {
  id: number
  name: string
  description: string
  icon: string
  pricing?: string
}

export const services: Service[] = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Full-stack web application development with modern technologies',
    icon: '💻',
    pricing: 'Custom Quote'
  },
  {
    id: 2,
    name: 'Security Audit',
    description: 'Comprehensive security assessment and penetration testing',
    icon: '🔒',
    pricing: 'Custom Quote'
  },
  {
    id: 3,
    name: 'Bug Bounty Consulting',
    description: 'Expert guidance on vulnerability disclosure and bounty strategies',
    icon: '🎯',
    pricing: 'Custom Quote'
  }
]
