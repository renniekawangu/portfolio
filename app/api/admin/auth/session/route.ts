import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  const isAuthenticated = await verifyAdminSessionToken(token)

  return Response.json({ isAuthenticated }, { status: isAuthenticated ? 200 : 401 })
}
