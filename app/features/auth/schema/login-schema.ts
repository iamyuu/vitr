import { z } from "zod";

export const LoginSearchSchema = z.object({
	redirect: z.string().optional(),
});

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
