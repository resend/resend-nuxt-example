import { Resend } from 'resend';

export default new Resend(process.env.RESEND_API_KEY);
