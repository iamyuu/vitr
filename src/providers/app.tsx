import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RootErrorBoundary, RootPendingFallback } from '~/components/root';
import { queryClient } from '~/libs/react-query';

export function AppProviders(props: React.PropsWithChildren) {
	return (
		<RootErrorBoundary>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<RootPendingFallback />}>
					<ReactQueryDevtools position='bottom-right' />
					<Router>{props.children}</Router>
				</Suspense>
			</QueryClientProvider>
		</RootErrorBoundary>
	);
}
