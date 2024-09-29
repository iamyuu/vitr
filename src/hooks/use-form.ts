import { zodResolver } from '@hookform/resolvers/zod';
import { useBlocker } from '@tanstack/react-router';
import { useId } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import type { FieldPath, FieldValues, UseFormProps } from 'react-hook-form';
import type { z } from 'zod';

export interface UseFormOptions<TFields extends FieldValues> extends Omit<UseFormProps<TFields>, 'resolver'> {
  /**
   * The Zod schema to validate the form
   * This also will be used to infer the type of the form
   */
  schema: z.Schema<TFields>;

  /**
   * Warn the user when there are unsaved changes
   * If `true`, it will show a modal to confirm if the user wants to leave the page
   *
   * @default false
   */
  warnWhenUnsavedChanges?: boolean;
}

/**
 * A hook to manage form state and validation with Zod schema
 *
 * @usage
 * ```tsx
 * const AwesomeSchema = z.object({ awesome: z.string() });
 *
 * function FormAwesome() {
 * 	const form = useForm({ schema: AwesomeSchema });
 *
 * 	const onSubmit = form.handleSubmit((data) => console.log(data));
 *
 * 	return (
 * 		<form id={form.formId} onSubmit={onSubmit}>
 * 			<FormField {...form.getFieldProps("awesome")}>
 * 				<Input />
 * 			</FormField>
 * 			<Button {...form.getButtonSubmitProps()}>Submit</Button>
 * 		</form>
 * 	);
 * }
 * ```
 */
export function useForm<TValues extends FieldValues = FieldValues>({
  schema,
  warnWhenUnsavedChanges = false,
  ...options
}: UseFormOptions<TValues>) {
  const formId = useId();
  const form = useHookForm({
    ...options,
    resolver: zodResolver(schema),
  });

  useBlocker({
    condition: warnWhenUnsavedChanges ? form.formState.isDirty : false,
    blockerFn: () => window.confirm('You have unsaved changes. Are you sure you want to leave?'),
  });

  return {
    ...form,
    formId,

    /**
     * Set the props for the `FormForm` component
     */
    getFieldProps: (name: FieldPath<TValues>) => ({
      ...form.register(name),
      ...form.getFieldState(name),
      id: formId,
    }),

    /**
     * Set the props for the button
     */
    getButtonSubmitProps: (props: React.ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
      ...props,
      id: `${formId}-button-submit`,
      type: 'submit' as const,
      disabled: props.disabled || options.disabled || form.formState.isSubmitting,
      'aria-busy': form.formState.isSubmitting,
    }),
  };
}
