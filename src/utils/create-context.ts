// thanks to https://github.com/chakra-ui/chakra-ui/blob/main/packages/react-utils/src/context.ts

import * as React from 'react';

export interface CreateContextOptions {
	/**
	 * If `true`, React will throw if context is `null` or `undefined`
	 * In some cases, you might want to support nested context, so you can set it to `false`
	 */
	strict?: boolean;

	/**
	 * Error message to throw if the context is `undefined`
	 */
	errorMessage?: string;

	/**
	 * The display name of the context
	 * The name must be PascalCase
	 */
	name?: string;
}

type CreateContextReturn<T> = [() => T, React.Provider<T>, React.Context<T>];

/**
 * Creates a named context, provider, and hook
 *
 * @usage
 * ```ts
 * const [useModalDisclosure, ModalDisclosureProvider] = createContext({ name: 'ModalDisclosureContext' })
 * ```
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
	const {
		strict = true,
		name = 'Context',
		errorMessage = `use${name}: "context" is undefined. Seems you forgot to wrap component within the ${name}Provider`,
	} = options;

	const Context = React.createContext<ContextType | undefined>(undefined);

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

	return [useContext, Context.Provider, Context] as CreateContextReturn<ContextType>;
}
