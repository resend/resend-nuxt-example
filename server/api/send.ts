export default defineEventHandler(async () => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    });

    return data;
  } catch (error) {
    return { error };
  }
});
