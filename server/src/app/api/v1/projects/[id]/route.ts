import { errorResponse, successResponse } from '@/lib/api/response';
import getProject from '@/services/getProject.service';
import { Timestamp } from 'firebase-admin/firestore';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const project = await getProject<{
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

    if (!project.success)
      return errorResponse(project.error.code, project.error.message, 404);

    const data = project.data;

    return successResponse(data, 200);
  } catch {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
