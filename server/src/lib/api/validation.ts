import z from 'zod';
import { ApiError } from './errors';

export async function parseJson<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new ApiError(
      400,
      'INVALID_JSON',
      'Request body must contain valid JSON',
    );
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    throw new ApiError(422, 'VALIDATION_ERROR', 'Request data is invalid');
  }

  return result.data;
}
