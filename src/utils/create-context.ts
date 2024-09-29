import * as React from 'react';

export interface CreateContextOptions {
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   *
   * @default true
   */
  strict?: boolean;

  /**
   * Error message to throw if the context is `undefined`
   *
   * @default `use${name}: "context" is undefined. Seems you forgot to wrap component within the ${name}Provider`
   */
  errorMessage?: string;

  /**
   * The display name of the context
   * The name must be PascalCase
   *
   * @default 'Context'
   */
  name?: string;
}

type CreateContextReturn<TValue> = [() => TValue, React.Provider<TValue>, React.Context<TValue>];

/**
 * Creates a named context, provider, and hook
 *
 * @usage
 * ```ts
 * const [useAwesome, AwesomeProvider] = createContext({ name: 'AwesomeContext' })
 * ```
 */
export function createContext<TContextValue>(options: CreateContextOptions = {}) {
  const {
    strict = true,
    name = 'Context',
    errorMessage = `use${name}: "context" is undefined. Seems you forgot to wrap component within the ${name}Provider`,
  } = options;

  const Context = React.createContext<TContextValue | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace(error, useContext);
      throw error;
    }

    return context;
  }

  return [useContext, Context.Provider, Context] as CreateContextReturn<TContextValue>;
}
