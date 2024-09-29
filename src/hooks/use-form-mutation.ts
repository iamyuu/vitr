import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useForm } from '~/hooks/use-form';
import type { UseFormOptions } from '~/hooks/use-form';
import { isHttpError } from '~/utils/http';
import type { HttpError, HttpReply } from '~/utils/http';

type ToastOptions<TData> = Parameters<typeof toast.promise<TData>>[1];

export interface UseFormMutationOptions<TFields extends FieldValues = FieldValues, TData = HttpReply<unknown>>
  extends UseFormOptions<TFields>,
    UseMutationOptions<TData, HttpError, TFields> {
  /**
   * Options for the toast
   *
   * @default { error: (reply) => reply.message }
   * @see https://sonner.emilkowal.ski/toast#promise
   */
  toastOptions?: ToastOptions<TData>;
}

/**
 * Similar to `useForm`, but also includes a mutation and performs a toast on submit
 *
 * @usage
 * ```tsx
 * const AwesomeSchema = z.object({ awesome: z.string() });
 *
 * const sendToServer = (data: z.infer<typeof AwesomeSchema>) => http.post("/api/awesome", { json: data }).json<ReplyAwesome>();
 *
 * function FormAwesome() {
 * 	const { form } = useFormMutation({
 * 		schema: AwesomeSchema,
 * 		mutationFn: sendToServer,
 * 		toastOptions: { loading: "Sending data...", success: "Data sent!", error: (reply) => reply.message },
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
 */
export function useFormMutation<TFields extends FieldValues = FieldValues, TData = HttpReply<unknown>>(
  options: UseFormMutationOptions<TFields, TData>,
  defaultValues?: UseFormMutationOptions<TFields, TData>['defaultValues'],
) {
  const defaultToastOptions: ToastOptions<TData> = { error: getErrorMessage };
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
    defaultValues: defaultValues || formOptions.defaultValues,
    disabled: mutation.isPending || Boolean(formOptions.disabled),
  });

  const onSubmit = form.handleSubmit(
    (formValues) =>
      toast.promise(mutation.mutateAsync(formValues), {
        ...defaultToastOptions,
        ...toastOptions,
      }),
    (formErrors) => {
      console.debug('form.handleSubmit invalid:', formErrors);
    },
  );

  return {
    ...mutation,

    // We want `getFormProps` under the `form` key, so we need to compose that
    form: {
      ...form,

      /**
       * Set the attributes for the form element
       */
      getFormProps: (props: React.FormHTMLAttributes<HTMLFormElement> = {}) => ({
        ...props,
        id: `${form.formId}-form`,
        onSubmit,
      }),
    },
  };
}

/**
 * Get the error message from the error
 * If the error is a HTTP error, it'll return the statusText
 * If the error is an instance of Error, it'll return the message
 * Otherwise, it'll return undefined (don't show anything)
 */
export function getErrorMessage(error: unknown) {
  if (isHttpError(error) || error instanceof Error) {
    return error.message;
  }

  return undefined;
}
