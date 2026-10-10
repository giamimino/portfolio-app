import { NextResponse } from 'next/server';
import { corsHeaders } from '@/lib/api/cors';
import { errorResponse, successResponse } from '@/lib/api/response';
import getAboutData from '@/services/getAboutData.service';
import { Timestamp } from 'firebase/firestore';
import getProjects from '@/services/getProjects.service';

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;

  return allowedOrigins.includes(origin);
}

export async function GET(req: Request) {
  try {
    const origin = req.headers.get('origin');

    if (!isAllowedOrigin(origin))
      return errorResponse('ORIGIN_NOT_ALLOWED', 'Origin is not allowed', 403);

    const data = await getProjects<
      {
        id: string;
        description: string;
        tags: string[];
        type: string;
        created_at: Timestamp;
        title: string;
        project_github_url: string;
        category: string;
        project_id: string;
        thum: string;
      }[]
    >();

    return successResponse(data, 200);
  } catch {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
