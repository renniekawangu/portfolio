import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Security Writeups & Research | b34st web',
  description: 'Detailed cybersecurity writeups, bug bounty reports, security research, and news updates on vulnerabilities and penetration testing.',
  keywords: 'security writeups, bug bounties, cybersecurity blog, penetration testing, vulnerability research',
  openGraph: {
    title: 'Blog - Security Writeups & Research | b34st web',
    description: 'Detailed cybersecurity writeups, bug bounty reports, security research, and news updates.',
    type: 'website',
    url: 'https://b34stweb.vercel.app/blog',
    images: [
      {
        url: 'https://b34stweb.vercel.app/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'b34st web Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Security Writeups & Research | b34st web',
    description: 'Detailed cybersecurity writeups, bug bounty reports, security research.'
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://b34stweb.vercel.app/api/blog/feed',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
