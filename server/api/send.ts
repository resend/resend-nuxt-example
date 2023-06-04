import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async () => {
  try {
    const data = await resend.sendEmail({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
      subject: "Hello world",
      html: "<strong>It works!</strong>",
    });

    return data;
  }
  catch (error) {
    return { error };
  }
});