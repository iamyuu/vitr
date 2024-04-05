import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "~/libs/router";
import { AppProviders } from "~/providers/app-providers";
import "~/styles/global.css";

export function App() {
	// We put the RouterProvider here instead of in app-providers
	// because we want to exclude that from the test environment
	return <RouterProvider router={router} />;
}

/**
 * Render the App with AppProviders
 *
 * @param root - The root element to render the app into it
 */
export function renderApp(root: HTMLElement) {
	createRoot(root).render(
		<StrictMode>
			<AppProviders>
				<App />
			</AppProviders>
		</StrictMode>,
	);
}
