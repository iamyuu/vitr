import type { ErrorBoundaryProps as ReaectErrorBoundaryProps } from 'react-error-boundary';
import { ErrorBoundary as ReaectErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '~/components/ui/fallback/error-fallback';

export type ErrorBoundaryProps = Omit<ReaectErrorBoundaryProps, 'fallback' | 'FallbackComponent'>;

export function ErrorBoundary(props: React.PropsWithChildren<ErrorBoundaryProps>) {
	return <ReaectErrorBoundary fallbackRender={ErrorFallback} {...props} />;
}
