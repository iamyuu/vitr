import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '~/providers/app';
import { AppRoutes } from '~/routes';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
	<StrictMode>
		<AppProviders>
			<AppRoutes />
		</AppProviders>
	</StrictMode>,
);
