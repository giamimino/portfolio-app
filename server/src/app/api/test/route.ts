import { corsHeaders } from '@/lib/api/cors';
import { NextResponse } from 'next/server';

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;

  return allowedOrigins.includes(origin);
}

export async function GET(req: Request) {
  const headers = corsHeaders(req.headers.get('origin'));

  if (isAllowedOrigin(req.headers.get('origin'))) {
    return NextResponse.json(
      {
        success: true,
        data: [],
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        success: false,
        message: 'error',
      },
      { status: 500 },
    );
  }
}
