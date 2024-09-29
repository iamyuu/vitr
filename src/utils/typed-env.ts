import { replaceKeys } from 'string-ts';
import type { ReplaceKeys } from 'string-ts';

/**
 * Create a typed environment variable parser.
 *
 * @usage
 * ```ts
 * const schema = z.object({ VITE_API_URL: z.string() });
 * const env = createTypedEnv(schema.parse)(import.meta.env);
 * env.API_URL; // http://localhost:8080
 * ```
 */
export function createTypedEnv<T>(schema: (v: unknown) => T) {
  // Instantiate a cache to store parsed environment variables.
  let cache: ReplaceKeys<T, 'VITE_', ''>;

  return (args: Record<string, unknown>) => {
    // If the environment variables are already cached, return the cached value.
    if (cache) return cache;

    // Otherwise, parse the environment variables and transform the keys
    cache = replaceKeys(schema({ ...args }), 'VITE_', '');
    return cache;
  };
}

if (import.meta.vitest) {
  const { vi, it, expect } = import.meta.vitest;

  it('should parse environment variables', () => {
    const schema = vi.fn().mockReturnValue({ MODE: 'development', VITE_API_URL: 'http://localhost:8080' });
    const env = createTypedEnv(schema)(import.meta.env);

    expect(schema).toHaveBeenCalledWith(import.meta.env);
    expect(env).toEqual({ MODE: 'development', API_URL: 'http://localhost:8080' });
  });
}
