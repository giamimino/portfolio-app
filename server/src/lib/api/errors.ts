import { errorResponse } from './response';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return errorResponse(error.code, error.message, error.status);
  }

  if (error instanceof SyntaxError) {
    return errorResponse(
      'iNVALID_JSON',
      'Request body must contain valid JSON',
      400,
    );
  }

  return errorResponse(
    'INTERNAL_SERVER_ERROR',
    'An unexpected error occurred',
    500,
  );
}
