import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createAdminSessionToken } from '@/lib/admin-auth'

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }))
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return Response.json({ success: false }, { status: 500 })
  }

  if (password !== adminPassword) {
    return Response.json({ success: false }, { status: 401 })
  }

  const token = await createAdminSessionToken()
  const response = Response.json({ success: true })

  response.headers.append(
    'Set-Cookie',
    `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${ADMIN_SESSION_MAX_AGE}; ${
      process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
    }`,
  )

  return response
}
