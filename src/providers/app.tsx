import { Toaster } from 'sonner';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/libs/react-query';

export function AppProviders(props: React.PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster closeButton richColors />

			{props.children}
		</QueryClientProvider>
	);
}
