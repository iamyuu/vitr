import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '~/utils/function';

export const inputStyles = tv({
  slots: {
    field: [
      'flex h-9 w-full bg-white px-3 py-2 text-body ring-offset-white placeholder:text-neutral-500',
      'border border-neutral-200 rounded-md',
      'file:border-0 file:bg-transparent file:text-body file:font-medium file:text-neutral-950',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-neutral-950',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    fieldError: 'border-danger-600 file:ring-danger-600',
    rootAdornment: [
      'flex items-center justify-center gap-2',
      'h-9 w-full bg-transparent px-3 ring-offset-white',
      'border border-neutral-200 rounded-md',
      'focus-within:ring-1 focus-within:ring-offset-0 focus-within:ring-neutral-950',
    ],
    adornment: 'text-neutral-400',
    fieldAdornment: [
      'h-full border-none px-0 shadow-none outline-none',
      'focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
    ],
  },
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, startAdornment = null, endAdornment = null, ...inputProps }, ref) => {
    const isInvalid = inputProps['aria-invalid'];
    const hasAdornment = Boolean(startAdornment) || Boolean(endAdornment);

    if (hasAdornment) {
      return (
        <div
          className={inputStyles().rootAdornment({
            class: isInvalid ? inputStyles().fieldError() : null,
          })}
          aria-disabled={inputProps.disabled}
        >
          {startAdornment ? <div className={inputStyles().adornment()}>{startAdornment}</div> : null}
          <input
            className={cn(
              inputStyles().field({
                class: inputStyles().fieldAdornment(),
              }),
              className,
            )}
            ref={ref}
            {...inputProps}
          />
          {endAdornment ? <div className={inputStyles().adornment()}>{endAdornment}</div> : null}
        </div>
      );
    }

    return (
      <input
        className={cn(
          inputStyles().field({
            class: isInvalid ? inputStyles().fieldError() : null,
          }),
          className,
        )}
        ref={ref}
        {...inputProps}
      />
    );
  },
);
Input.displayName = 'Input';
