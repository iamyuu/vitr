import type { NotFoundRouteProps } from "@tanstack/react-router";

export function NotFoundFallback(props: NotFoundRouteProps) {
	return (
		<div className="p-2">
			<h1>Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	);
}
