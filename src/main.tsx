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

const showErrorOverlay = (err: unknown) => {
	const ErrorOverlay = customElements.get('vite-error-overlay');

	if (!ErrorOverlay || import.meta.env.PROD) return;

	document.body.appendChild(new ErrorOverlay(err));
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason));
