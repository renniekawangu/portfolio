import { Suspense } from 'react'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function BlogPostContentWrapper({ params }: PageProps) {
  const { slug } = await params
  return <BlogPostClient slug={slug} onNotFound={() => notFound()} />
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={
      <main className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Loading post...</p>
        </div>
      </main>
    }>
      <BlogPostContentWrapper params={params} />
    </Suspense>
  )
}
