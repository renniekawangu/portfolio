---
title: API Rate Limiting Bypass Vulnerability
slug: api-rate-limiting-bypass
category: API Security
date: 2024-11-20
type: writeup
difficulty: High
bountyAmount: 3000
tags: API, Authentication, Performance, High
readTime: 6 min read
pocVideoUrl: https://drive.google.com/file/d/example
reportUrl: https://drive.google.com/file/d/example
---

# API Rate Limiting Bypass Vulnerability

## Overview
During penetration testing of a REST API, I discovered a critical vulnerability in the rate limiting implementation that allowed attackers to bypass request throttling mechanisms.

## Vulnerability Details

### Root Cause
The rate limiting was implemented using the client's IP address as the primary identifier. However, the system failed to properly handle:

1. **X-Forwarded-For Header Spoofing** - Attackers could inject custom headers to spoof their origin IP
2. **Null Byte Injection** - Using encoded null bytes to bypass filters
3. **Case Sensitivity Issues** - Different casing in header names bypassed checks

### Attack Scenario
```bash
curl -H "X-Forwarded-For: 192.168.1.1" https://api.example.com/login
curl -H "x-forwarded-for: 192.168.1.2" https://api.example.com/login
curl -H "X_FORWARDED_FOR: 192.168.1.3" https://api.example.com/login
```

This allowed unlimited login attempts, enabling brute force attacks.

## Security Impact
- **Brute Force Attacks** - Unlimited authentication attempts
- **Credential Stuffing** - Testing compromised password lists at scale
- **Denial of Service** - API exhaustion without restrictions
- **Financial Impact** - Premium endpoint abuse without billing

## Remediation Steps

### 1. Proper Rate Limiting Implementation
```javascript
// Use a combination of identifiers, not just IP
const clientIdentifier = hash(userAgent + IP + session);
const rateLimitKey = `rate_limit:${clientIdentifier}`;
```

### 2. Header Validation
- Whitelist only trusted proxy headers
- Validate header format and content
- Use case-insensitive comparison
- Strip potentially malicious headers

### 3. Additional Controls
- Implement token bucket algorithm
- Use distributed rate limiting (Redis)
- Add CAPTCHA for repeated failures
- Monitor for pattern abuse

## Timeline
- **Nov 10, 2024** - Vulnerability discovered
- **Nov 15, 2024** - Vendor notified
- **Nov 18, 2024** - Patch released
- **Nov 20, 2024** - Public disclosure

## References
- [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Prevention_Cheat_Sheet.html)
- [RFC 7239 - Forwarded HTTP Extension](https://tools.ietf.org/html/rfc7239)
