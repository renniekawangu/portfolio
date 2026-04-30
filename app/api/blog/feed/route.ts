import { blogPosts } from '@/app/blog/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourportfolio.com'

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bug Bounty Writeups</title>
    <link>${baseUrl}/blog</link>
    <description>Detailed writeups of vulnerabilities discovered during bug bounty hunting</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/api/blog/feed" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ') || ''}
      <author>your-email@example.com (Your Name)</author>
      <content:encoded><![CDATA[
        <h2>${escapeXml(post.title)}</h2>
        <p><strong>Difficulty:</strong> ${post.difficulty || 'N/A'}</p>
        ${post.bountyAmount ? `<p><strong>Bounty Amount:</strong> $${post.bountyAmount.toLocaleString()}</p>` : ''}
        <p><strong>Read Time:</strong> ${post.readTime}</p>
        ${post.tags ? `<p><strong>Tags:</strong> ${post.tags.join(', ')}</p>` : ''}
        <p>${escapeXml(post.excerpt)}</p>
        <p><a href="${baseUrl}/blog/${post.slug}">Read full writeup</a></p>
      ]]></content:encoded>
    </item>
    `
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss.trim(), {
    headers: {
      'content-type': 'application/xml; charset=UTF-8',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}
