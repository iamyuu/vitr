import { getRouteApi, useRouter } from "@tanstack/react-router";
import { FormField } from "~/components/form";
import { Button, Input } from "~/components/ui";
import { LoginSchema } from "~/features/auth/schema/login-schema";
import { loginWithEmailAndPassword } from "~/features/auth/services/login-service";
import { useFormMutation } from "~/hooks/use-form-mutation";

const route = getRouteApi("/login");

export default function LoginPage() {
	const router = useRouter();
	const search = route.useSearch();
	const routerContext = route.useRouteContext();

	const { form } = useFormMutation({
		schema: LoginSchema,
		mutationFn: loginWithEmailAndPassword,
		onSuccess: (newSession) => {
			// Update the session in the context and redirect to the previous page
			routerContext.auth.login(newSession);
			router.history.push(search.redirect || "/");
		},
	});

	return (
		<div className="h-screen bg-secondary flex items-center">
			<form
				className="flex flex-col space-y-4 p-4 mx-auto w-2/6 rounded-md shadow-md bg-white"
				{...form.getFormProps()}
			>
				<FormField label="Email" {...form.getFieldProps("email")}>
					<Input type="email" />
				</FormField>

				<FormField label="Password" {...form.getFieldProps("password")}>
					<Input type="password" />
				</FormField>

				<Button {...form.getButtonSubmitProps()}>Sign in</Button>
			</form>
		</div>
	);
}
