# Automatic Google Drive → Cloudinary Upload

This feature lets you paste a Google Drive image link in the admin Blog form and automatically convert it into a proper Cloudinary URL that Facebook (and other platforms) can display.

## 1. Install the new dependency

```bash
npm install cloudinary
```

## 2. Add environment variables

Create or update `.env.local` (and also add them in the Vercel dashboard):

```env
CLOUDINARY_CLOUD_NAME=dmeofhnrx
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=HTmFTGHwmio3ZdbkP2TUO7I7XDs
```

You can find the API Key and API Secret in:
**Cloudinary Dashboard → Settings → API Keys**

> Security note: The API Secret was shared in chat. After everything works, regenerate the API Secret in Cloudinary.

## 3. How to use

1. Go to Admin → Blog → Create / Edit a post
2. In the **Hero Image URL** field, paste the Google Drive link that Claude gave you
3. Click the orange button **Upload to Cloudinary**
4. Wait a few seconds
5. The field will be replaced with a clean Cloudinary URL (already resized to 1200×630)
6. Save the post

Facebook will now be able to show the real hero image when the post is shared.

## What the system does

- Detects Google Drive links
- Downloads the image
- Uploads it to your Cloudinary account (folder: `blog-heroes`)
- Automatically optimizes it to 1200×630 (perfect for Facebook Open Graph)
- Fills both `heroImage` and `ogImage` fields

## Troubleshooting

- **"Could not extract file ID"** → Make sure the Google Drive file is shared as **"Anyone with the link can view"**
- **"Invalid Cloudinary credentials"** → Double-check the three environment variables
- Image still not showing on Facebook → Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click **Scrape Again**
