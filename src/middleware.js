// import { NextResponse } from 'next/server';

// // This function can be marked `async` if using `await` inside
// export function middleware(req) {
//   return NextResponse.redirect(new URL('/denied', req.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/about'],
// };
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (req.nextUrl.pathname.startsWith('/about') && req.nextauth.token.role === '') {
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/about'] };
