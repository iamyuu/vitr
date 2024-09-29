import { forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';
import { cn } from '~/utils/function';

export const buttonStyles = tv({
  base: [
    'inline-flex items-center justify-center gap-1',
    'font-semibold whitespace-nowrap rounded-md ring-offset-white transition-colors select-none',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-950 focus-visible:ring-offset-1',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    tone: {
      primary: '',
      neutral: '',
      danger: '',
    },
    appearance: {
      solid: '',
      outline: '',
      ghost: '',
      link: '',
    },
    size: {
      tiny: 'px-2.5 py-1.5 text-xs',
      small: 'px-4 py-2 text-tiny',
      medium: 'px-4 py-2 text-body',
      large: 'px-4 py-2 text-heading-4',
    },
    shape: {
      circle: 'rounded-full p-1',
      square: 'rounded-md',
    },
  },
  compoundVariants: [
    {
      tone: 'primary',
      appearance: 'solid',
      class: 'text-white bg-primary-600 ring-primary-500 hover:bg-primary-700',
    },
    {
      tone: 'primary',
      appearance: 'outline',
      class: 'text-primary-600 bg-transparent ring-primary-500 border border-primary-600 hover:bg-primary-100',
    },
    {
      tone: 'primary',
      appearance: 'ghost',
      class: 'text-primary-600 bg-transparent ring-transparent hover:bg-primary-100',
    },
    {
      tone: 'primary',
      appearance: 'link',
      class: 'text-primary-600 bg-transparent ring-transparent hover:underline',
    },

    {
      tone: 'neutral',
      appearance: 'solid',
      class: 'text-white bg-neutral-600 ring-neutral-500 hover:bg-neutral-700',
    },
    {
      tone: 'neutral',
      appearance: 'outline',
      class: 'text-neutral-600 bg-transparent ring-neutral-500 border border-neutral-600 hover:bg-neutral-100',
    },
    {
      tone: 'neutral',
      appearance: 'ghost',
      class: 'text-neutral-600 bg-transparent ring-transparent hover:bg-neutral-100',
    },
    {
      tone: 'neutral',
      appearance: 'link',
      class: 'text-neutral-600 bg-transparent ring-transparent hover:underline',
    },

    {
      tone: 'danger',
      appearance: 'solid',
      class: 'text-white bg-danger-600 ring-danger-500 hover:bg-danger-700',
    },
    {
      tone: 'danger',
      appearance: 'outline',
      class: 'text-danger-600 bg-transparent ring-danger-500 border border-danger-600 hover:bg-danger-100',
    },
    {
      tone: 'danger',
      appearance: 'ghost',
      class: 'text-danger-600 bg-transparent ring-transparent hover:bg-danger-100',
    },
    {
      tone: 'danger',
      appearance: 'link',
      class: 'text-danger-600 bg-transparent ring-transparent hover:underline',
    },
  ],
  defaultVariants: {
    size: 'medium',
    tone: 'primary',
    shape: 'square',
    appearance: 'solid',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, tone, size, shape, appearance, ...buttonProps }, ref) => {
    return (
      <button
        className={cn(buttonStyles({ tone, size, shape, appearance, className }))}
        ref={ref}
        type="button"
        {...buttonProps}
      />
    );
  },
);
Button.displayName = 'Button';
