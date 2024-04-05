import { createFileRoute, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { FormField } from "~/components/form";
import { Button, Input } from "~/components/ui";
import { LoginSchema } from "~/features/auth/schema/login-schema";
import { loginWithEmailAndPassword } from "~/features/auth/services/login-service";
import { useFormMutation } from "~/hooks/use-form-mutation";

const LoginSearchSchema = z.object({
	redirect: z.string().catch("/"),
});

export const Route = createFileRoute("/auth/login")({
	validateSearch: LoginSearchSchema,
	component: LoginPage,
});

function LoginPage() {
	const router = useRouter();
	const search = Route.useSearch();
	const routerContext = Route.useRouteContext();

	const { form } = useFormMutation({
		schema: LoginSchema,
		mutationFn: loginWithEmailAndPassword,
		onSuccess: (newSession) => {
			// Update the session in the context and redirect to the previous page
			routerContext.auth.login(newSession);
			router.history.push(search.redirect);
		},
	});

	return (
		<form className="flex flex-col space-y-2 p-2" {...form.getFormProps()}>
			<FormField {...form.getFieldProps("email")}>
				<Input type="email" />
			</FormField>

			<FormField {...form.getFieldProps("password")}>
				<Input type="password" />
			</FormField>

			<Button {...form.getButtonSubmitProps()}>Sign in</Button>
		</form>
	);
}
