import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge class names with Tailwind CSS.
 *
 * @usage
 * ```tsx
 * const className = cn('text-black', 'bg-white', 'p-4'); // 'text-black bg-white p-4'
 * ```
 *
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should merge class names', () => {
    expect(cn('text-black', 'bg-white', 'p-4')).toBe('text-black bg-white p-4');
    expect(cn('text-black', 'text-black')).toBe('text-black');
    expect(cn('text-black', 'text-white')).toBe('text-white');
  });
}

/**
 * A utility function to sleep for a given amount of time.
 *
 * @param timeInMs - The time to sleep in milliseconds
 * @returns A promise that resolves after the given time
 */
export function sleep(timeInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should sleep for the given time', async () => {
    const start = Date.now();
    await sleep(1_000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1_000);
  });
}
