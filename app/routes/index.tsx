import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

function IndexPage() {
	const routerContext = Route.useRouteContext();

	return (
		<div className="space-y-4">
			<h1>profile page</h1>
			<pre>{JSON.stringify(routerContext.auth.session, null, 2)}</pre>
		</div>
	);
}
