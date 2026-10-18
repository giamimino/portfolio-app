import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, verifyApiKey } from './lib/auth/ApiKeys';

export const config = {
  matcher: '/api/:path*',
};

export async function proxy(req: NextRequest) {
  const token = extractBearerToken(req.headers.get('authorization'));

  if (!token || !verifyApiKey(token)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: 'UNAUTHORIZED', message: '' },
      },
      { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } },
    );
  }

  return NextResponse.next();
}
