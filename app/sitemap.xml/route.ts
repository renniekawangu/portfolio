import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = 'https://b34stweb.vercel.app'

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <url>
       <loc>${siteUrl}</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${siteUrl}/blog</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     <url>
       <loc>${siteUrl}/blog/archive</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${siteUrl}/projects</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>${siteUrl}/services</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${siteUrl}/about</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${siteUrl}/contact</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     <!-- Blog Categories -->
     <url>
       <loc>${siteUrl}/blog/category/web-security</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${siteUrl}/blog/category/access-control</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
     <url>
       <loc>${siteUrl}/blog/category/api-security</loc>
       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
   </urlset>
 `

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}
