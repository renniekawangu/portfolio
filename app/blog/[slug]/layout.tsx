import { Metadata } from 'next'
import { blogPosts } from '../data'

interface PageProps {
  params: Promise<{ slug: string }>
}

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://b34stweb.vercel.app').replace(/\/$/, '')

function resolveMetadataImage(imageUrl?: string) {
  if (!imageUrl) {
    return `${siteUrl}/b34st_logo.png`
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  return new URL(imageUrl, siteUrl).toString()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `${siteUrl}/blog/${post.slug}`
  const pageTitle = post.seoTitle || post.title
  const pageDescription = post.seoDescription || post.excerpt
  const imageUrl = resolveMetadataImage(post.ogImage || post.heroImage)

  return {
    metadataBase: new URL(siteUrl),
    title: pageTitle,
    description: pageDescription,
    keywords: post.tags,
    authors: [{ name: post.author || 'Your Name' }],
    alternates: {
      canonical: post.canonicalUrl || url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Your Name'],
      tags: post.tags,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
