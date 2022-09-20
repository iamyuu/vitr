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
	const elementName = 'vite-error-overlay';
	const ErrorOverlay = customElements.get(elementName);

	// prevent double overlay
	const isAlreadyAppear = document.body.contains(document.querySelector(elementName));
	const isDev = import.meta.env.DEV;

	if (!ErrorOverlay || isAlreadyAppear || !isDev) {
		return;
	}

	document.body.appendChild(new ErrorOverlay(err));
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason));
