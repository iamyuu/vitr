import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { isBrowser } from '~/constants/env';
// import { refreshTokenAndRetry } from '~/features/auth/utils/refresh-token';
import { isHttpError } from './http';
import type { HttpError } from './http';

const MAX_RETRY = 5;
const isUnauthorized = (error: unknown) =>
  isHttpError(error) ? error.response.status === 401 || error.response.status === 403 : false;

let queryClient: QueryClient | undefined = undefined;

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Throw error if query fails, so we can catch it with ErrorBoundary
        throwOnError: true,

        refetchOnMount: true,
        refetchInterval: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false,

        retry: (failureCount, error) => {
          // Skip retry if the error is 401 or 403
          if (isUnauthorized(error)) {
            return false;
          }

          // Retries when the failure count is less than the maximum retry count
          return failureCount <= MAX_RETRY;
        },
        // retry every 2, 4, 8, 16, 30 seconds
        retryDelay: (retryCount) => Math.min(1_000 * 2 ** retryCount, 30_000),
      },
      mutations: {
        onError: (_error, _variables, recover) => {
          // Recover from error, if possible
          if (typeof recover === 'function') {
            return recover();
          }

          return null;
        },
      },
    },

    queryCache: new QueryCache({
      // onError: (error, query) => {
      //   // Automatically refresh the token if the error is 401 or 403
      //   if (isUnauthorized(error)) {
      //     refreshTokenAndRetry({ query });
      //   }
      // },
    }),

    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        // Automatically invalidate the query cache based on the mutation key
        queryClient?.invalidateQueries({
          queryKey: mutation.options.mutationKey,
        });
      },
      // onError(error, variables, _context, mutation) {
      //   // Automatically refresh the token if the error is 401 or 403
      //   if (isUnauthorized(error)) {
      //     refreshTokenAndRetry({ mutation, variables });
      //   }
      // },
    }),
  });
}

export function getQueryClient() {
  if (isBrowser === false) {
    // Server: always make a new query client
    return createQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (queryClient === undefined) queryClient = createQueryClient();
  return queryClient;
}

declare module '@tanstack/react-query' {
  interface Register {
    // Set the default error type to HttpError
    defaultError: HttpError;
  }
}
