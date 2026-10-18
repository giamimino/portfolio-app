import { errorResponse, successResponse } from '@/lib/api/response';
import { Timestamp } from 'firebase/firestore';
import getProjects from '@/services/getProjects.service';

export async function GET() {
  try {
    const res = await getProjects<
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

    if (!res.success)
      return errorResponse(res.error.code, res.error.message, 404);

    return successResponse(res.data, 200);
  } catch {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
