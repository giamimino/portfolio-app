import { NextResponse } from 'next/server';

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const allowedMethods = 'GET';
const allowedHeaders = 'Content-Type, Authorization';

export function corsHeaders(origin: string | null) {
  const headers = new Headers();

  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
    headers.set('Access-Control-Allow-Methods', allowedMethods);
    headers.set('Access-Control-Allow-Headers', allowedHeaders);
    headers.set('Access-Control-Max-Age', '86400');

    return headers;
  }
}

export function optionsResponse(req: Request) {
  const origin = req.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      {
        success: true,
        error: {
          code: 'ORIGIN_NOT_ALLOWED',
          message: 'Origin is not allowed',
        },
      },
      { status: 403 },
    );
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
