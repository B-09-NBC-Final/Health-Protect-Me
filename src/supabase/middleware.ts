import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthToken } from '@/api/getUserData';
import { getUserSurveyStatus } from '../api/getUserSurveyStatus';

export const updateSession = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const authToken = await getAuthToken();

  // 로그인 상태에서 접근할 수 없는 페이지는
  const restrictedPaths = ['/login'];
  if (restrictedPaths.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  // 로그인하지 않은 상태에서 접근할 수 있는 페이지들
  const publicPaths = ['/posting-update', '/posting-main', '/posting', '/posting-detail', '/my-page'];
  if (publicPaths.includes(pathname) && !authToken) {
    const url = new URL('/login', req.nextUrl.origin);
    url.searchParams.set('message', '로그인 후 이용부탁드립니다');
    return NextResponse.redirect(url);
  }

  // 설문조사를 완료하지 않은 유저가 접근할 수 없는 페이지들
  if (authToken) {
    const surveyCompleted = await getUserSurveyStatus(authToken);
    if (!surveyCompleted && publicPaths.includes(pathname)) {
      const url = new URL('/info', req.nextUrl.origin);
      url.searchParams.set('message', '설문조사를 완료해주세요');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};
