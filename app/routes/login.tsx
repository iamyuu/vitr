import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { LoginSearchSchema } from "~/features/auth/schema/login-schema";

export const Route = createFileRoute("/login")({
	validateSearch: LoginSearchSchema,
	component: lazyRouteComponent(
		() => import("~/features/auth/screens/page-login"),
	),
});
