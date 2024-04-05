import ky, { HTTPError, type AfterResponseHook } from "ky";
import { env } from "~/constants/env";

/**
 * Check if the error is a HTTP error
 */
export const isHttpError = (error: unknown): error is HTTPError => {
	return error instanceof HTTPError;
};

/**
 * Log HTTP errors for monitoring
 */
const errorLogger: AfterResponseHook = (_request, _options, response) => {
	if (response.status >= 500 && response.status < 600) {
		// Log the error (e.g. Sentry)
	}

	return response;
};

/**
 * Create a HTTP client with default settings
 */
export const http = ky.create({
	// Set API URL as default prefix
	prefixUrl: env.VITE_API_URL,
	// Set default headers
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	// Disable ky retry mechanism, it'll handled by react-query
	retry: 0,
	// Include credentials, e.g. cookies for authenticated requests
	credentials: "include",
	hooks: {
		afterResponse: [errorLogger],
	},
});
