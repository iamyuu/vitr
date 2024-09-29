import { tv } from 'tailwind-variants';

export const cardStyles = tv({
  slots: {
    root: 'p-4 space-y-4 bg-white ring-offset-white rounded-lg shadow-sm',
    title: 'text-heading-4 font-semibold',
    body: 'text-body text-neutral-500',
  },
});
