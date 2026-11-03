import { Metadata } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import mongoose from 'mongoose'
import { BlogPost } from '../data'

interface PageProps {
  params: Promise<{ slug: string }>
}

const siteUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://b34stweb.vercel.app').replace(/\/$/, '')

/**
 * Resolve a safe absolute URL for Open Graph / Twitter images.
 * - Prefers post.ogImage → post.heroImage
 * - Rejects data: URLs (Facebook does not support them)
 * - Always returns an absolute https URL
 */
function resolveMetadataImage(imageUrl?: string): string {
  const fallbackImage = `${siteUrl}/b34st_logo.png`

  if (!imageUrl) {
    return fallbackImage
  }

  // Facebook and most social platforms reject data: URLs
  if (imageUrl.startsWith('data:')) {
    return fallbackImage
  }

  // Already absolute
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl
  }

  // Relative path → make absolute
  try {
    return new URL(imageUrl, siteUrl).toString()
  } catch {
    return fallbackImage
  }
}

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    await connectToDatabase()
    const db = mongoose.connection.db
    if (!db) return null

    const collection = db.collection('blogPosts')
    const post = await collection.findOne({ slug })

    if (!post) return null

    return {
      ...post,
      id: post._id?.toString() || post.id,
    } as BlogPost
  } catch (error) {
    console.error('Failed to fetch blog post for metadata:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

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
    authors: [{ name: post.author || 'b34st web' }],
    alternates: {
      canonical: post.canonicalUrl || url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'b34st web'],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
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
