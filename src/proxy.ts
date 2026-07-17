import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check for the auth cookie
  const authCookie = request.cookies.get('followup_auth_token');

  // If trying to access dashboard/contacts without being logged in, redirect to login
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (login page)
     */
    '/dashboard/:path*',
    '/contacts/:path*',
    '/settings/:path*',
  ],
};
