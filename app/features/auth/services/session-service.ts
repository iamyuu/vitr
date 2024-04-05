import { queryOptions } from "@tanstack/react-query";
import type { AuthSession } from "~/features/auth/types/session";
import { http } from "~/libs/http";
import { queryClient } from "~/libs/tanstack-query";

type SessionState =
	| { isAuthenticated: true; session: AuthSession }
	| { isAuthenticated: false; session: null };

export type SessionService = SessionState & {
	getSession: () => Promise<AuthSession>;
	login: (session: AuthSession) => Promise<void>;
	logout: () => void;
};

export const authSessionOptions = queryOptions({
	// Disable retries and throw on error to prevent infinite loops fetching the session
	retry: false,
	throwOnError: false,
	queryKey: ["session"],
	queryFn: async () => await http.get("auth/me").json<AuthSession>(),
});

export const sessionService: SessionService = {
	session: null,
	isAuthenticated: false,

	/**
	 * Get the current session user from the server
	 */
	getSession: async () => {
		// Get the current session from the cache or fetch it from the server
		const currentSession =
			await queryClient.ensureQueryData(authSessionOptions);

		// Update the auth state, by setting the session to the current session
		sessionService.isAuthenticated = true;
		sessionService.session = currentSession;

		return currentSession;
	},

	/**
	 * Login the user by setting the session
	 * This function only update the auth state and cache, so it can be used for any login method
	 */
	login: async (newSession) => {
		// Update the auth state, by setting the session to the new session
		sessionService.isAuthenticated = true;
		sessionService.session = newSession;

		// Set the session in the cache
		queryClient.setQueryData(authSessionOptions.queryKey, newSession);
	},

	/**
	 * Logout the user
	 * Clear the session and cache
	 */
	logout: async () => {
		// Update the auth state, by setting the session to null
		sessionService.isAuthenticated = false;
		sessionService.session = null;

		// Remove all cache after logout
		queryClient.clear();
	},
};
