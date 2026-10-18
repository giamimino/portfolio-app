import { errorResponse, successResponse } from '@/lib/api/response';
import getLandingPageData from '@/services/getLandingPageData.service';
import getLatestProjects from '@/services/getLatestProjects.service';
import { ExpPanelAboutType, ProjectType } from '@/types';

export async function GET(req: Request) {
  try {
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
