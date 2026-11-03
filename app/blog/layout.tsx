import { Metadata } from 'next'

const siteUrl = 'https://b34stweb.vercel.app'

/**
 * Blog listing page metadata.
 * Uses the same default social card as the rest of the site.
 * Replace /public/og-default.png with a real 1200×630 image.
 */
export const metadata: Metadata = {
  title: 'Blog - Security Writeups & Research | b34st web',
  description:
    'Detailed cybersecurity writeups, bug bounty reports, security research, and news updates on vulnerabilities and penetration testing.',
  keywords:
    'security writeups, bug bounties, cybersecurity blog, penetration testing, vulnerability research',
  openGraph: {
    title: 'Blog - Security Writeups & Research | b34st web',
    description:
      'Detailed cybersecurity writeups, bug bounty reports, security research, and news updates.',
    type: 'website',
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'b34st web Blog',
      },
      {
        url: `${siteUrl}/b34st_logo.png`,
        width: 1200,
        height: 630,
        alt: 'b34st web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Security Writeups & Research | b34st web',
    description:
      'Detailed cybersecurity writeups, bug bounty reports, security research.',
    images: [`${siteUrl}/og-default.png`],
  },
  alternates: {
    types: {
      'application/rss+xml': `${siteUrl}/api/blog/feed`,
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
