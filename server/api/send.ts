import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async () => {
	const response = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: ["delivered@resend.dev"],
		subject: "Hello world",
		html: "<strong>It works!</strong>",
	});

	if (response.error) {
		throw createError({
			statusCode: 500,
			message: "Error sending email",
		});
	}

	return response;
});
