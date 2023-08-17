import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { env } from '~/constants/env';

const defaultMessage = `Something went wrong`;
const permission = `You don't have access to this page`;
const badRequest = `Bad Request`;
const unauthorized = `Unauthorized`;
const forbidden = `Forbidden`;
const notFound = `Nothing to see here`;
const notFoundMessage = `Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL`;
const internalServerError = `Internal server error`;

const errorMap = {
	BadRequest: badRequest,
	Unauthorized: unauthorized,
	Forbidden: forbidden,
	NotFound: notFound,
	InternalServerError: internalServerError,
} as Record<string, string>;

export function useError() {
	const error = useRouteError();
	const defaultError = {
		statusCode: 500,
		reason: 'Unknown',
		message: error instanceof Error && !env.PROD ? error.message : defaultMessage,
	};

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return {
				statusCode: error.status,
				reason: notFound,
				message: notFoundMessage,
			};
		}

		const isPermissionDenied = error.status === 403 || error.status === 401;

		return {
			statusCode: error.status,
			reason: errorMap[error.statusText] || defaultError.reason,
			message: isPermissionDenied ? permission : defaultError.message,
		};
	}

	return defaultError;
}
