import { errorResponse, successResponse } from '@/lib/api/response';
import sendContact from '@/services/sendContact.service';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { template }: { template: string } = await req.json();

    const send = await sendContact<{ code: string; message: string }>(
      template,
      resend,
    );

    if (!send.success) errorResponse(send.error.code, send.error.message, 400);

    return successResponse({ success: true, data: send }, 200);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: '' }, { status: 500 });
  }
}
