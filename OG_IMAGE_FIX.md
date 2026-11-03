# Open Graph Image Fix – Facebook Share Preview

## Problem
When sharing links from your site on Facebook, the image was not appearing (or appeared incorrectly).

**Root cause:**  
The image used for Open Graph (`b34st_logo.png`) is only **847 × 232** pixels.  
Facebook strongly prefers (and often requires) **1200 × 630** images for reliable previews.

## What was changed in the code

1. **`app/layout.tsx`**
   - Now prefers `/og-default.png` (1200×630)
   - Falls back to the logo if the new file is missing
   - Explicitly sets width & height

2. **`app/blog/[slug]/layout.tsx`**
   - Improved image resolver
   - Rejects `data:` URLs (Facebook does not support them)
   - Always outputs absolute URLs
   - Always includes width: 1200, height: 630
   - Prefers `post.ogImage` → `post.heroImage` → default

3. **`app/blog/layout.tsx`**
   - Updated to use the same default social card

4. **`lib/heroImageHandler.ts`**
   - `generateOgImage()` no longer returns data URLs

## What you still need to do

1. **Create a proper social card image**
   - Size: **1200 × 630** pixels
   - Format: PNG or JPG
   - Content suggestion: dark background + your logo + site name + short tagline
   - Save it as: `public/og-default.png`

2. (Optional but recommended) Create post-specific images and set the `ogImage` field when creating/editing blog posts.

3. **Deploy** the updated code + the new `og-default.png`.

4. **Clear Facebook’s cache**
   - Go to: https://developers.facebook.com/tools/debug/
   - Paste your URL
   - Click **Scrape Again** (do it 2–3 times)

After these steps the image should appear correctly when sharing on Facebook, LinkedIn, Twitter/X, Discord, etc.
