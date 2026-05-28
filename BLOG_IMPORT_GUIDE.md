# Blog Post Import Guide

This guide explains how to use the blog import feature to quickly add multiple blog posts to your portfolio by uploading JSON or Markdown files.

## Supported File Formats

### 1. JSON Format (`.json`)

JSON files should contain a single blog post object with the following structure:

```json
{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Brief summary of the post",
  "content": "# Full markdown content here\n\nThis is the main content.",
  "date": "2024-12-15",
  "category": "Web Security",
  "type": "writeup",
  "readTime": "8 min read",
  "difficulty": "Critical",
  "bountyAmount": 5000,
  "tags": ["Security", "API", "Authentication"],
  "pocVideoUrl": "https://drive.google.com/file/d/...",
  "reportUrl": "https://drive.google.com/file/d/..."
}
```

#### Required Fields
- `title` - Post title
- `slug` - URL-friendly identifier (no spaces, lowercase)
- `excerpt` - Brief summary (recommended: 160 characters or less)
- `content` - Full post content (supports markdown)

#### Optional Fields
- `date` - Publication date (YYYY-MM-DD format, defaults to today)
- `category` - Category name (defaults to "Web Security")
- `type` - Post type: `writeup`, `news`, or `story` (defaults to "writeup")
- `readTime` - Estimated read time (defaults to "5 min read")
- `difficulty` - Only for writeups: `Low`, `Medium`, `High`, `Critical`
- `bountyAmount` - Bug bounty amount (number, no currency symbol)
- `tags` - Array of tags
- `pocVideoUrl` - Link to proof-of-concept video
- `reportUrl` - Link to security report
- `heroImage` - URL to hero/featured image

### 2. Markdown Format (`.md`)

Markdown files support optional YAML-style frontmatter at the top, followed by the post content:

```markdown
---
title: Post Title
slug: post-slug
category: Web Security
date: 2024-12-15
type: writeup
difficulty: Critical
bountyAmount: 5000
tags: Security, API, Authentication
readTime: 8 min read
pocVideoUrl: https://drive.google.com/file/d/...
reportUrl: https://drive.google.com/file/d/...
---

# Full markdown content goes here

This is the main content of your blog post. You can use standard markdown formatting:

- **Bold text**
- *Italic text*
- # Headings
- [Links](https://example.com)
- Code blocks, lists, etc.
```

#### Frontmatter Fields
All frontmatter fields are optional. You can use any subset of the following:
- `title` - Generated from filename if omitted
- `slug` - Generated from filename if omitted
- `category` - Defaults to "Web Security"
- `date` - Defaults to today
- `type` - Defaults to "writeup"
- `difficulty` - For writeup posts
- `bountyAmount` - Numeric value
- `tags` - Comma-separated list
- `readTime` - String like "5 min read"
- `pocVideoUrl` - URL
- `reportUrl` - URL

#### Content
Everything after the closing `---` is treated as the markdown content.

## Usage

1. Navigate to the Admin Dashboard
2. Go to **Blog Posts** section
3. Click the **⬆ Import** button
4. Select one or more JSON/Markdown files to import
5. Files are validated and imported into your blog

## Tips

### Batch Import
You can select multiple files at once to import several posts in one operation.

### Content Formatting
- Use standard markdown syntax in your content
- Code blocks can be created with triple backticks: ` ``` `
- Links, images, and all markdown features are supported

### Filename Convention
For markdown files, use descriptive filenames as they'll be used as defaults:
- `sql-injection-in-apis.md` → slug: `sql-injection-in-apis`
- `My Security Report.md` → slug: `my-security-report`

### Validation
The importer validates:
- Required fields are present
- File format is valid JSON or markdown
- Slug format is URL-friendly
- File size is reasonable

## Examples

Example files are provided in `/public/assets/blog-import-examples/`:
- `example-post.json` - JSON format example
- `example-post.md` - Markdown format example

You can download these as templates and modify them for your posts.

## Troubleshooting

### "Invalid JSON format"
- Ensure your JSON is valid (use a JSON validator)
- Check that all required fields are present
- Verify quotes and commas are correct

### "Missing required fields"
For JSON: `title`, `slug`, `excerpt`, and `content` are required.
For Markdown: Only content is required; other fields have defaults.

### "Unsupported file type"
Only `.json` and `.md` files are supported. Ensure file extensions are correct.

### Duplicate Slugs
Each post must have a unique slug. If importing posts with duplicate slugs, change them before import.

## Best Practices

1. **Unique Slugs** - Ensure each post has a unique, memorable slug
2. **Clear Excerpts** - Write compelling excerpts (160 chars or less)
3. **Proper Markdown** - Use consistent markdown formatting
4. **Categorization** - Use consistent category names
5. **Tagging** - Add relevant tags for better organization
6. **Dates** - Use accurate publication dates (YYYY-MM-DD)

## File Size Limits

There are no hard file size limits, but keep in mind:
- Single post content should typically be under 50KB
- Focus on clarity over length
- Very large posts may take longer to render

---

For more help, check the example files or refer to the [BlogPost interface](../../blog/data.ts) in the codebase.
