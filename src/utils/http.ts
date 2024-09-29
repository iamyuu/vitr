import type { AfterResponseHook, BeforeErrorHook, BeforeRequestHook } from 'ky';
import ky, { HTTPError } from 'ky';
import { env } from '~/constants/env';
// import { authStore } from '~/features/auth/stores/session.store';
import { logger } from '~/utils/monitoring';

export interface HttpReply<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export { HTTPError as HttpError };

/**
 * Check if the error is a HTTP error
 */
export const isHttpError = (error: unknown): error is HTTPError => {
  return error instanceof HTTPError;
};

/**
 * This hook is used to add the access token to the request headers
 * before sending the request to the server.
 */
const authHook: BeforeRequestHook = (request) => {
  // const token = authStore.getSnapshot().context.accessToken;

  // if (token) {
  //   request.headers.set('Authorization', `Bearer ${token}`);
  // }

  return request;
};

/**
 * This hook is used to log the response to the logger service
 * after receiving the response from the server.
 */
const loggerErrorHook: AfterResponseHook = async (request, options, response) => {
  if (response.status >= 500 && response.status < 600) {
    logger.error(new HTTPError(response, request, options));
  }

  return response;
};

/**
 * This hook is used to transform the error response to a more
 * reusable format, so we can use it in the UI.
 */
const transformError: BeforeErrorHook = async (error) => {
  // Get the error message from the server
  const reply = (await error.response.json()) as HttpReply;

  // Use the error message from the server, if available
  // Otherwise, use the status text from the response, if available
  // Otherwise, use the error message from the error, if available
  // Otherwise, use a generic message
  error.message = reply?.message || error?.response?.statusText || error?.message || 'Internal Server Error';
  return error;
};

/**
 * Create a HTTP client with default settings
 */
export const http = ky.create({
  // Set API URL as default prefix
  prefixUrl: env.API_URL,
  // Set default headers
  headers: {
    'Content-Type': 'application/json',
  },
  // Disable ky retry mechanism, it'll handled by react-query
  retry: 0,
  hooks: {
    beforeRequest: [authHook],
    beforeError: [transformError],
    afterResponse: [loggerErrorHook],
  },
});
