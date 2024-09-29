import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import type { RouterContext } from '~/providers/router-provider';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  ),
});
