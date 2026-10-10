import { NextResponse } from 'next/server';

export type ApiError = {
  code: string;
  message: string;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: ApiError;
};

export function successResponse<T>(data: T, status: 200) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data }, { status });
}

export function errorResponse(code: string, message: string, status: number) {
  return NextResponse.json<ApiFailure>(
    { success: false, error: { code, message } },
    { status },
  );
}
