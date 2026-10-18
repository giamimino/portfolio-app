import { errorResponse, successResponse } from '@/lib/api/response';
import getAboutData from '@/services/getAboutData.service';
import { Timestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const res = await getAboutData<
      {
        id: string;
        createdAt: Timestamp;
        text: string;
        title: string;
      }[]
    >();

    if (!res.success)
      return errorResponse(res.error.code, res.error.message, 404);

    const data = res.data;

    return successResponse(data, 200);
  } catch {
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      'Unexpected server error',
      500,
    );
  }
}
