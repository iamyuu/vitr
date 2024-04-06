import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { HTTPError } from "ky";
import type { FieldValues } from "react-hook-form";
import { toast } from "~/libs/toast";
import { type UseFormOptions, useForm } from "./use-form";

export interface UseFormMutationOptions<TFields extends FieldValues, TData>
	extends UseFormOptions<TFields>,
		UseMutationOptions<TData, HTTPError, TFields> {
	/**
	 * Options for the toast
	 *
	 * @default undefined
	 * @see https://sonner.emilkowal.ski/toast#promise
	 */
	toastOptions?: Parameters<typeof toast.promise>[1];
}

/**
 * Similar to `useForm`, but also includes a mutation and performs a toast on submit
 *
 * @usage
 * ```tsx
 * const AwesomeSchema = z.object({ awesome: z.any() });
 *
 * const sendToServer = (data: z.infer<typeof AwesomeSchema>) => http.post("/api/awesome", { json: data }).json<ReplyAwesome>();
 *
 * function FormAwesome() {
 * 	const { form } = useFormMutation({
 * 		schema: AwesomeSchema,
 * 		mutationFn: sendToServer,
 * 	});
 *
 * 	return (
 * 		<form {...form.getFormProps()}>
 * 			<FormField {...form.getFieldProps("awesome")}>
 * 				<Input />
 * 			</FormField>
 * 			<Button {...form.getButtonSubmitProps()}>Submit</Button>
 * 		</form>
 * 	);
 * }
 * ```
 *
 * @param options - Options for the `useForm` and `useMutation` hooks, plus `toastOptions` for the toast
 * @returns The form and mutation state
 */
export function useFormMutation<
	TFields extends FieldValues = FieldValues,
	TData = unknown,
>(options: UseFormMutationOptions<TFields, TData>) {
	const {
		// Mutation options
		meta,
		gcTime,
		retry,
		retryDelay,
		onMutate,
		onSuccess,
		onError,
		onSettled,
		mutationFn,
		throwOnError,
		networkMode,
		mutationKey,

		// Toast options
		toastOptions,

		// Form options
		...formOptions
	} = options;

	const mutation = useMutation({
		meta,
		gcTime,
		retry,
		retryDelay,
		onMutate,
		onSuccess,
		onError,
		onSettled,
		mutationFn,
		throwOnError,
		networkMode,
		mutationKey,
	});

	const form = useForm<TFields>({
		...formOptions,
		disabled: mutation.isPending || formOptions.disabled,
	});

	const onSubmit = form.handleSubmit((formValues) =>
		toast.promise(mutation.mutateAsync(formValues), toastOptions),
	);

	return {
		...mutation,

		// We want `getFormProps` under the `form` key, so we need to compose that
		form: {
			...form,

			/**
			 * Set the attributes for the form element
			 */
			getFormProps: () =>
				({
					onSubmit,
				}) satisfies React.FormHTMLAttributes<HTMLFormElement>,
		},
	};
}
