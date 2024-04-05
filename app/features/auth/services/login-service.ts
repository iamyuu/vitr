import type { LoginDTO } from "~/features/auth/schema/login-schema";
import type { AuthSession } from "~/features/auth/types/session";
import { http } from "~/libs/http";

export function loginWithEmailAndPassword(body: LoginDTO) {
	return http.post("auth/login", { json: body }).json<AuthSession>();
}
