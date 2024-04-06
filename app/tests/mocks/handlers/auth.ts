import { http, HttpResponse } from "msw";
import { env } from "~/constants/env";
import { db } from "~/tests/mocks/db";
import { hash } from "~/tests/mocks/utils";

const namespace = `${env.VITE_API_URL}/auth`;

export const authHandlers = [
	http.post<never, { email: string; password: string }>(
		`${namespace}/login`,
		async ({ request }) => {
			const formData = await request.json();

			const user = db.user.findFirst({
				where: {
					email: {
						equals: formData.email,
					},
				},
			});

			if (!user || user.password !== hash(formData.password)) {
				return HttpResponse.json(
					{ error: "Invalid email or password" },
					{ status: 400 },
				);
			}

			return HttpResponse.json(
				{ user },
				{
					headers: {
						"Set-Cookie":
							"token=123; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600; Secure",
					},
				},
			);
		},
	),

	http.get(`${namespace}/me`, async ({ cookies }) => {
		const { token } = cookies;

		if (!token) {
			return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// This is a mock implementation, we don't really validate the token
		const user = db.user.findFirst({
			where: {
				id: {
					equals: 1,
				},
			},
		});

		if (!user) {
			return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		return HttpResponse.json({ user });
	}),
];
