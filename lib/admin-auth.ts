export const ADMIN_SESSION_COOKIE = 'admin_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8

type AdminSessionPayload = {
  exp: number
  role: 'admin'
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ''
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function textToBase64Url(value: string) {
  return bytesToBase64Url(new TextEncoder().encode(value))
}

function base64UrlToText(value: string) {
  return new TextDecoder().decode(base64UrlToBytes(value))
}

async function getSigningKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createAdminSessionToken() {
  const secret = getSessionSecret()

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be set')
  }

  const payload: AdminSessionPayload = {
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
    role: 'admin',
  }
  const encodedPayload = textToBase64Url(JSON.stringify(payload))
  const key = await getSigningKey(secret)
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(encodedPayload),
  )

  return `${encodedPayload}.${bytesToBase64Url(new Uint8Array(signature))}`
}

export async function verifyAdminSessionToken(token?: string) {
  const secret = getSessionSecret()

  if (!secret || !token) {
    return false
  }

  const [encodedPayload, encodedSignature] = token.split('.')

  if (!encodedPayload || !encodedSignature) {
    return false
  }

  try {
    const key = await getSigningKey(secret)
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlToBytes(encodedSignature),
      new TextEncoder().encode(encodedPayload),
    )

    if (!isValid) {
      return false
    }

    const payload = JSON.parse(base64UrlToText(encodedPayload)) as AdminSessionPayload

    return payload.role === 'admin' && payload.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}
