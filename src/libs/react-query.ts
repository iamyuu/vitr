import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const MAX_RETRY = 3;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry: failureCount => failureCount <= MAX_RETRY,
		},
		mutations: {
			onError: (error, _variables, recover) => {
				// Show toast notification
				const reason = error instanceof Error ? error.message : 'Something went wrong, please try again later';
				toast.error(reason);

				// Recover from error, if possible
				if (typeof recover === 'function') {
					return recover();
				}

				return null;
			},
		},
	},
});
