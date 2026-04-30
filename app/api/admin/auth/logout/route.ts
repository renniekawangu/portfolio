import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'

export async function POST() {
  const response = Response.json({ success: true })

  response.headers.append(
    'Set-Cookie',
    `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${
      process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    }`,
  )

  return response
}
