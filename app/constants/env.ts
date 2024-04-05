import { z } from "zod";

export const env = z
	.object({
		DEV: z.boolean(),
		PROD: z.boolean(),
		BASE_URL: z.string(),
		VITE_API_URL: z.string().url(),
	})
	.parse(import.meta.env);
