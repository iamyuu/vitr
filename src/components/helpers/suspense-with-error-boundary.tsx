import { Suspense } from 'react';
import { PendingFallback, type PendingFallbackProps } from '~/components/ui/fallback/pending-fallback';
import { ErrorBoundary, type ErrorBoundaryProps } from './error-boundary';

export type SuspenseWithErrorBoundaryProps = ErrorBoundaryProps & {
	pendingProps?: PendingFallbackProps;
};

export function SuspenseWithErrorBoundary(props: React.PropsWithChildren<SuspenseWithErrorBoundaryProps>) {
	const { pendingProps, ...errorBoundaryProps } = props;

	return (
		<ErrorBoundary {...errorBoundaryProps}>
			<Suspense fallback={<PendingFallback {...pendingProps} />}>{props.children}</Suspense>
		</ErrorBoundary>
	);
}
