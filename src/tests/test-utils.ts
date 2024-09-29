import {
  Outlet,
  type RouteOptions,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
export { AppProviders } from '~/providers/app-providers';

/**
 * Utils for waiting loading to finish
 */
export function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(
    () => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)],
    {
      timeout: 4000,
    },
  );
}

interface CreateTestRouterOptions extends Pick<RouteOptions, 'validateSearch'> {
  path?: string;
  component: () => JSX.Element;
}

/**
 * Utils for creating a test router
 *
 * @usage
 * ```tsx
 * const router = createTestRouter({ path: '/', component: () => <div>Home</div> });
 * render(<RouterProvider router={router} />);
 * expect(screen.getByText('Home')).toBeInTheDocument();
 * ```
 */
export function createTestRouter(options: CreateTestRouterOptions) {
  const path = options.path || '/';

  const rootRoute = createRootRoute({
    component: Outlet,
  });

  const componentRoute = createRoute({
    ...options,
    path,
    getParentRoute: () => rootRoute,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  return router;
}

export * from '@testing-library/react';
