import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, verifyApiKey } from './ApiKeys';

type Handler = (req: NextRequest, ctx: unknown) => Promise<Response> | Response;

export default function withApiKey(handler: Handler): Handler {
  return async (req, ctx) => {
    const token = extractBearerToken(req.headers.get('authorization'));

    if (!token || !verifyApiKey(token)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: '' },
        },
        {
          status: 401,
          headers: { 'WWW-Authenticate': 'Bearer' },
        },
      );
    }

    return handler(req, ctx);
  };
}
