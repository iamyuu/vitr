import '~/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '~/providers/app';
import { App } from '~/app';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

createRoot(root).render(
	<StrictMode>
		<AppProviders>
			<App />
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
