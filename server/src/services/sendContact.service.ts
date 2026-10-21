import { ServiceResponse } from '@/types';
import { Resend } from 'resend';

export default async function sendContact<T>(
  template: string,
  resend: Resend,
): Promise<ServiceResponse<T>> {
  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'devbytesyt@gmail.com',
      subject: 'Messaage Form Portfolio to Gia',
      html: template,
    });

    if (error)
      return {
        success: false,
        error: {
          code: 'MESSAGE_SEND_ERROR',
          message: 'The message failed to send. Please try again.',
        },
      };

    return {
      success: true,
      data: {
        code: 'MESSAGE_SEND_SUCCESS',
        message: 'Message sent successfully',
      } as T,
    };
  } catch {
    return {
      success: false,
      error: { code: 'DATA_NOT_FOUND', message: "Data can't be found" },
    };
  }
}
