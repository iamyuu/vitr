import { QueryClient } from "@tanstack/react-query";

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			throwOnError: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: false,
			retry: (failureCount) => failureCount <= MAX_RETRY,
			retryDelay: (retryCount) => Math.min(1_000 * 2 ** retryCount, 30_000),
		},
		mutations: {
			onError: (_error, _variables, recover) => {
				// Recover from error, if possible
				if (typeof recover === "function") {
					return recover();
				}

				return null;
			},
		},
	},
});
