import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthToken } from '@/utils/cookieUtils';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = getAuthToken(req); // 쿠키에서 auth token을 가져옴

  // 로그인 상태에서 접근할 수 없는 페이지는
  const restrictedPaths = ['/login'];

  if (restrictedPaths.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  // 로그인하지 않은 상태에서 접근할 수 없는 페이지는
  const protectedPaths = ['/mypage'];
  if (protectedPaths.includes(pathname) && !authToken) {
    const url = new URL('/login', req.nextUrl.origin);
    url.searchParams.set('message', '로그인 후 이용부탁드립니다');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/mypage']
};
