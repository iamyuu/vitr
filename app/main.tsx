import { renderApp } from "~/app";
import { env } from "~/constants/env";

enableMocking().then(() => {
	renderApp(document.getElementById("root") as HTMLElement);
});

/**
 * Show error overlay when error occurred
 */
const showErrorOverlay = (error: unknown) => {
	const elementName = "vite-error-overlay";
	const ErrorOverlay = customElements.get(elementName);

	// Prevent double overlay
	const isAlreadyAppear = document.body.contains(
		document.querySelector(elementName),
	);

	if (!ErrorOverlay || isAlreadyAppear || env.PROD) {
		return;
	}

	document.body.appendChild(new ErrorOverlay(error));
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
	showErrorOverlay(reason),
);

/**
 * Enable mocking in development mode
 * You may remove this function if you don't need mocking on development mode
 */
async function enableMocking() {
	if (env.DEV && !env.VITE_ENABLE_MOCKING) {
		return;
	}

	const { worker } = await import("~/tests/mocks/browser");
	return worker.start({
		quiet: true,
		onUnhandledRequest: "bypass",
		serviceWorker: {
			url: "/mockServiceWorker.js",
		},
	});
}
