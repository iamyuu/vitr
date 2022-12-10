import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary, Suspense } from '~/components/helpers';
import { queryClient } from '~/libs/react-query';

export function AppProviders(props: React.PropsWithChildren) {
	return (
		<ErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools position='bottom-right' />
				<Suspense>{props.children}</Suspense>
			</QueryClientProvider>
		</ErrorBoundary>
	);
}
