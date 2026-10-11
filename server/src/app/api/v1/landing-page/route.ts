import { errorResponse, successResponse } from '@/lib/api/response';
import getLandingPageData from '@/services/getLandingPageData.service';
import getLatestProjects from '@/services/getLatestProjects.service';
import { ExpPanelAboutType, ProjectType } from '@/types';

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

    const about = await getLandingPageData<ExpPanelAboutType[]>();
    const projects = await getLatestProjects<ProjectType[]>();

    const data = { about, projects };

    return successResponse(data, 200);
  } catch {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
