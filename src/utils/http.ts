import { joinURL, withQuery, type QueryObject } from 'ufo';
import { API_URL } from '~/constants/env';
// import { queryClient } from '~/libs/react-query';
// import { getToken, flushStorage } from '~/features/auth';

interface RequestInitClient extends Omit<RequestInit, 'body'> {
	data?: Record<string, unknown> | FormData;
	params?: QueryObject;
}

interface HttpResponse<TData> {
	status: number;
	message: string;
	data: TData;
}

/**
 * HTTP request with several thing already configured
 */
export function http<TData = unknown>(endpoint: string, requestInit?: RequestInitClient) {
	if (!API_URL) {
		throw new Error('`VITE_API_URL` is not defined. Seems you forgot add on `.env` file');
	}

	// const accessToken = getToken();
	const { signal, abort } = new AbortController();
	const { data, params = {}, headers: customHeaders, ...customConfig } = requestInit ?? {};

	const url = endpoint.includes('http') ? endpoint : joinURL(API_URL, endpoint);
	const input = withQuery(url, params);

	const headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
		...customHeaders,
	});

	// if (accessToken) {
	// 	headers.append('Authorization', `Bearer ${accessToken}`);
	// }

	let payload: FormData | string;

	if (data instanceof FormData) {
		headers.delete('Content-Type');
		payload = data;
	} else {
		payload = JSON.stringify(data);
	}

	const config = {
		signal,
		headers,
		method: data ? 'POST' : 'GET',
		body: data ? payload : undefined,
		...customConfig,
	};

	const fetcher = window.fetch(input, config).then(async response => {
		const responseData = (await response.json()) as unknown;

		if (response.ok) {
			return responseData as HttpResponse<TData>;
		}

		// if (response.status === 401) {
		// 	flushStorage();
		// 	queryClient.clear();
		// 	window.location.assign(window.location.origin);
		// }

		const reason = (responseData as HttpResponse<never>).message || 'Internal Server Error';

		const error = new Error(reason);
		error.name = 'HttpError';
		throw error;
	});

	return Object.assign(fetcher, { cancel: abort });
}
