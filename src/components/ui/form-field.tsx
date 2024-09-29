import { cloneElement, forwardRef, useId } from 'react';
import type { FieldValues, UseFormGetFieldState } from 'react-hook-form';
import { tv } from 'tailwind-variants';

export const formFieldStyles = tv({
  slots: {
    root: 'flex flex-col gap-1',
    label: ['text-small font-medium leading-none', 'peer-disabled:cursor-not-allowed peer-disabled:opacity-70'],
    description: 'text-tiny text-neutral-500',
  },
});

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLElement>,
    Partial<ReturnType<UseFormGetFieldState<FieldValues>>> {
  label: string;
  description?: string;
  children: React.ReactElement;
}

export const FormField = forwardRef<HTMLElement, FormFieldProps>(
  ({ id, invalid, isDirty, isTouched, isValidating, label, error, description, children, ...restProps }, ref) => {
    const labelAsId = label.toLowerCase().replace(/\s/g, '-');
    const formItemId = `${id}-${labelAsId}-field`;
    const formMessageId = `${id}-${labelAsId}-error`;
    const formDescriptionId = description ? `${id}-${labelAsId}-helper` : '';

    return (
      <div
        className={formFieldStyles().root({
          class: error ? 'text-danger-600' : '',
        })}
      >
        <label htmlFor={formItemId} className={formFieldStyles().label()}>
          {label}
        </label>

        {cloneElement(children, {
          ...restProps,
          ref,
          id: formItemId,
          'aria-invalid': Boolean(error),
          'aria-describedby': error === undefined ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        })}

        {description ? (
          <small id={formDescriptionId} className={formFieldStyles().description()}>
            {description}
          </small>
        ) : null}

        {invalid && error ? (
          <small
            id={formMessageId}
            className={formFieldStyles().description({
              class: 'font-medium text-danger-600',
            })}
          >
            {error.message}
          </small>
        ) : null}
      </div>
    );
  },
);
FormField.displayName = 'FormField';
