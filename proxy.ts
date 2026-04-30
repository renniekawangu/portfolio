import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from './lib/admin-auth'

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const isAuthenticated = await verifyAdminSessionToken(token)

  if (isAuthenticated) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/admin/login', request.url))
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
