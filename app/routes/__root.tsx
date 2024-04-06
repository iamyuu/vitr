import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
	redirect,
} from "@tanstack/react-router";
import { isHttpError } from "~/libs/http";
import type { RouterContext } from "~/libs/router";

const publicRoutes = ["/login"];

export const Route = createRootRouteWithContext<RouterContext>()({
	/**
	 * Check if the user is authenticated before load the route
	 * But skip the check for public routes
	 */
	beforeLoad: async ({ context, location }) => {
		// Skip the auth check for public routes
		if (publicRoutes.includes(location.pathname)) {
			return;
		}

		const redirectToLogin = () =>
			redirect({ to: "/login", search: { redirect: location.href } });

		// Get the session from the server first to check if the user is authenticated
		try {
			await context.auth.getSession();

			// Redirect to login if the user is not authenticated
			if (context.auth.isAuthenticated === false) {
				throw redirectToLogin();
			}

			// Otherwise, return the session in context
			return {
				session: context.auth.session,
			};
		} catch (error) {
			// If can't get the session and response status is 401, logout and redirect to login
			if (isHttpError(error) && error.response.status === 401) {
				context.auth.logout();

				throw redirectToLogin();
			}
		}
	},
	component: () => (
		<>
			<Outlet />
			<ScrollRestoration />
		</>
	),
});
