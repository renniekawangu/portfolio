# Blog Import Quick Reference

## Access the Feature
**Admin Dashboard** → **Blog Posts** → **⬆ Import Button**

## Supported File Formats

### JSON (.json)
Minimal example:
```json
{
  "title": "My Blog Post",
  "slug": "my-blog-post",
  "excerpt": "A brief summary",
  "content": "# Post content with markdown"
}
```

### Markdown (.md)
Minimal example:
```markdown
---
title: My Blog Post
slug: my-blog-post
---

# Post content with markdown
```

## Required Fields
- `title` - Post heading
- `slug` - URL identifier (lowercase, hyphens only)
- `excerpt` - Brief summary (aim for <160 chars)
- `content` - Main post body (markdown supported)

## Optional Fields
| Field | Type | Default |
|-------|------|---------|
| `date` | YYYY-MM-DD | Today |
| `category` | string | Web Security |
| `type` | writeup/news/story | writeup |
| `readTime` | string | 5 min read |
| `difficulty` | Low/Medium/High/Critical | — |
| `bountyAmount` | number | — |
| `tags` | array/CSV | — |
| `pocVideoUrl` | URL | — |
| `reportUrl` | URL | — |
| `heroImage` | URL | — |

## Import Tips

✅ **DO**
- Use descriptive, unique slugs
- Write compelling excerpts
- Use proper markdown formatting
- Include relevant tags
- Set accurate dates

❌ **DON'T**
- Use duplicate slugs
- Leave required fields empty
- Use special characters in slugs
- Upload non-.json/.md files
- Use invalid YAML frontmatter syntax

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Invalid JSON format" | Validate JSON using jsonlint.com |
| "Missing required fields" | Add title, slug, excerpt, content |
| "Unsupported file type" | Save as .json or .md extension |
| "Invalid markdown syntax" | Check YAML frontmatter formatting |

## Example Tags
```
Security, Web, API, Authentication, Database, Critical, News, Writeup
```

## Markdown Features Supported
- **Headers**: # H1, ## H2, ### H3
- **Lists**: - item or 1. item
- **Code**: \`inline\` or \`\`\`block\`\`\`
- **Links**: [text](url)
- **Images**: ![alt](url)
- **Bold/Italic**: **bold** or *italic*
- **Blockquotes**: > quote

## Keyboard Shortcuts
- No special shortcuts for import
- Standard browser file dialog shortcuts apply

## Batch Operations
- Select **multiple files** at once
- All files processed sequentially
- Stop if any file has errors
- Successful imports are committed
- Failed imports can be retried

## Examples Location
`public/assets/blog-import-examples/`
- `example-post.json` - Full JSON template
- `example-post.md` - Full Markdown template

---

**Need Help?** See `BLOG_IMPORT_GUIDE.md` for detailed documentation.
