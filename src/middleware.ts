import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
const roles = [
  { role: 'ADMIN', block: [' '] },
  { role: 'USER', block: ['/admin/*'] },
];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (token) {
    const role = jwtDecode(token)?.role;

    roles.forEach((r) => {
      if (r.role === role) {
        r.block.forEach((b) => {
          const patern = b.replace('*', '');
          if (request.nextUrl.pathname.startsWith(patern)) {
            return NextResponse.redirect(new URL('/', request.url));
          }
        });
      }
    });
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
