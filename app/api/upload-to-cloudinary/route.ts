import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

/**
 * Convert a Google Drive share link into a direct download URL
 */
function getGoogleDriveDirectUrl(url: string): string | null {
  try {
    // Common patterns:
    // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // https://drive.google.com/open?id=FILE_ID
    // https://drive.google.com/uc?id=FILE_ID&export=download

    let fileId: string | null = null

    // Pattern 1: /file/d/FILE_ID/
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (fileMatch) {
      fileId = fileMatch[1]
    }

    // Pattern 2: ?id=FILE_ID or &id=FILE_ID
    if (!fileId) {
      const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
      if (idMatch) {
        fileId = idMatch[1]
      }
    }

    if (!fileId) return null

    // Best direct download URL for server-side fetching
    return `https://drive.google.com/uc?export=download&id=${fileId}`
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, folder = 'blog-heroes' } = body

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'imageUrl is required' },
        { status: 400 }
      )
    }

    // Check Cloudinary credentials
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          error:
            'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your environment variables.',
        },
        { status: 500 }
      )
    }

    let uploadSource = imageUrl

    // If it's a Google Drive link, convert it
    if (imageUrl.includes('drive.google.com')) {
      const directUrl = getGoogleDriveDirectUrl(imageUrl)
      if (!directUrl) {
        return NextResponse.json(
          { error: 'Could not extract file ID from the Google Drive link. Make sure the file is shared as "Anyone with the link".' },
          { status: 400 }
        )
      }
      uploadSource = directUrl
    }

    // Upload to Cloudinary
    // We use upload_stream / remote URL upload
    const result = await cloudinary.uploader.upload(uploadSource, {
      folder,
      resource_type: 'image',
      // Optimize for Open Graph
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
        { quality: 'auto', fetch_format: 'auto' },
      ],
      // Make sure we get a clean public URL
      overwrite: true,
      unique_filename: true,
    })

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    })
  } catch (error: unknown) {
    console.error('Cloudinary upload error:', error)

    // Provide helpful error messages
    let message = 'Failed to upload image'
    const err = error as { message?: string; http_code?: number }

    if (err?.message?.includes('Invalid image file')) {
      message = 'The file is not a valid image or Google Drive is blocking the download. Make sure the file is shared publicly ("Anyone with the link can view").'
    } else if (err?.http_code === 401 || err?.message?.includes('Invalid API')) {
      message = 'Invalid Cloudinary credentials. Check your API Key and API Secret.'
    } else if (err?.message) {
      message = err.message
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
