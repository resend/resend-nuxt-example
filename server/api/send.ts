import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(() => {
  return resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Hello world',
    html: '<strong>It works!</strong>',
  });
});
