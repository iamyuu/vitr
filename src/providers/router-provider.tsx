import type { QueryClient } from '@tanstack/react-query';
import { RouterProvider as TanStackRouterProvider, createRouter } from '@tanstack/react-router';
import { ErrorFallback, NotFoundFallback, PendingFallback } from '~/components/fallback';
// import { useAuth } from '~/features/auth/stores/session.store';
// import type { AuthSession } from '~/features/auth/types/session.type';
import { routeTree } from '~/generated/route';
import { logger } from '~/utils/monitoring';
import { getQueryClient } from '~/utils/query-client';

export interface RouterContext {
  // auth: AuthSession;
  queryClient: QueryClient;
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,

  // Since we're using React Query, we don't want loader calls to ever be stale
  // It will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  // Preload the linked route on hover
  defaultPreload: 'intent',

  // Fallback components for error, pending, and not found states
  defaultErrorComponent: ErrorFallback,
  defaultPendingComponent: PendingFallback,
  defaultNotFoundComponent: NotFoundFallback,

  // Context will be used as dependency injection for the loaders
  context: {
    // // biome-ignore lint/style/noNonNullAssertion: We'll set the auth context later
    // auth: null!,
    queryClient: getQueryClient(),
  },

  // Catch all errors and log them
  defaultOnCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(error, (scope) => {
      if (errorInfo.componentStack) {
        scope.setExtra('component stack', errorInfo.componentStack);
      }

      return scope;
    });
  },
});

export function RouterProvider() {
  // Set the auth context for the router, we set it here to ensure it's subscribed to the store
  // const auth = useAuth();

  return (
    <TanStackRouterProvider
      router={router}
      context={
        {
          /* >auth */
        }
      }
    />
  );
}
