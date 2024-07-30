import type { NextRequest } from 'next/server';

export function getAuthToken(req: NextRequest): string | undefined {
  const authToken = req.cookies.get('sb-qdtbndpvityeryaniyfj-auth-token.0');
  return authToken?.value;
}
