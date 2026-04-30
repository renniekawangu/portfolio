import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bug Bounty Writeups | Your Portfolio',
  description: 'Detailed writeups of vulnerabilities discovered and responsibly disclosed during bug bounty hunting engagements.',
  keywords: 'bug bounty, security research, vulnerability disclosure, writeups, hacking',
  openGraph: {
    title: 'Bug Bounty Writeups',
    description: 'Detailed writeups of vulnerabilities discovered and responsibly disclosed during bug bounty hunting engagements.',
    type: 'website',
    url: 'https://yourportfolio.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bug Bounty Writeups',
    description: 'Detailed writeups of vulnerabilities discovered and responsibly disclosed during bug bounty hunting engagements.',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://yourportfolio.com/api/blog/feed',
    },
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
