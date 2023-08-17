import ky, { HTTPError, type NormalizedOptions } from 'ky';
import { env } from '~/constants/env';
import { getToken } from '~/utils/session';

/**
 * Check if the error is a HTTP error
 */
export function isHttpError(error: unknown): error is HTTPError {
	return error instanceof HTTPError;
}

/**
 * Add Authorization header to every request
 */
function authHook(request: Request) {
	const token = getToken();
	if (token) {
		request.headers.set('Authorization', `Bearer ${token}`);
	}

	return request;
}

/**
 * Log HTTP errors for monitoring
 */
function errorLogger(_request: Request, _options: NormalizedOptions, response: Response) {
	if (response.status >= 500 && response.status < 600) {
		// log the error (e.g. Sentry)
	}

	return response;
}

/**
 * Create a HTTP client with default settings
 */
export const http = ky.create({
	// Set API URL as default prefix
	prefixUrl: env.VITE_API_URL,
	// Set default headers
	headers: {
		'Content-Type': 'application/json',
	},
	// Disable Ky's retry mechanism, will be handled by react-query
	retry: 0,
	hooks: {
		beforeRequest: [authHook],
		afterResponse: [errorLogger],
	},
});
