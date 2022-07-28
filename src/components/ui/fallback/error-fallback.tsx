import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback(props: FallbackProps) {
	const { reset } = useQueryErrorResetBoundary();

	return (
		<div role='alert'>
			<strong>{props.error.name || 'Error'}</strong>
			<p>{props.error.message || 'Ooops, something went wrong :('}</p>

			<button onClick={reset}>Try again</button>
		</div>
	);
}
