import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

function RootErrorFallback(props: FallbackProps) {
	function handleRefresh() {
		window.location.assign(window.location.origin);
	}

	return (
		<div role='alert'>
			<strong>{props.error.name || 'Error'}</strong>
			<p>{props.error.message || 'Ooops, something went wrong :('}</p>

			<button onClick={handleRefresh}>Refresh</button>
		</div>
	);
}

export function RootErrorBoundary(props: React.PropsWithChildren) {
	return <ErrorBoundary FallbackComponent={RootErrorFallback}>{props.children}</ErrorBoundary>;
}
