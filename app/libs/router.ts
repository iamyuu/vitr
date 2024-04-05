import type { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import {
	ErrorFallback,
	NotFoundFallback,
	PendingFallback,
} from "~/components/fallback";
import { type SessionService, sessionService } from "~/features/auth";
import { routeTree } from "~/generated/route";
import { queryClient } from "~/libs/tanstack-query";

export const router = createRouter({
	routeTree,

	// Since we're using React Query, we don't want loader calls to ever be stale
	// It will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
	// Preload the linked route on hover
	defaultPreload: "intent",

	// Fallback components for error, pending, and not found states
	defaultErrorComponent: ErrorFallback,
	defaultPendingComponent: PendingFallback,
	defaultNotFoundComponent: NotFoundFallback,

	context: {
		queryClient,
		auth: sessionService,
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export interface RouterContext {
	auth: SessionService;
	queryClient: QueryClient;
}
