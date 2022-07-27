import { QueryClient } from '@tanstack/react-query';
import { http } from '~/utils/http';

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry: failureCount => failureCount <= MAX_RETRY,
			queryFn: ({ queryKey, signal }) => {
				const [endpoint] = queryKey;

				if (typeof endpoint === 'string') {
					return http(endpoint, { signal });
				}
			},
		},
	},
});
