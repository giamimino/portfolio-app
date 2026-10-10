import { errorResponse, successResponse } from '@/lib/api/response';
import getProject from '@/services/getProject.service';
import { Timestamp } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;

  return allowedOrigins.includes(origin);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const origin = req.headers.get('origin');
    if (!isAllowedOrigin(origin) || !id)
      return errorResponse('ORIGIN_NOT_ALLOWED', 'Origin is not allowed', 403);

    const data = await getProject<{
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
    }>(id);

    return successResponse(data, 200);
  } catch (err) {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
