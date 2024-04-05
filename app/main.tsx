import { renderApp } from "~/app";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");
renderApp(root);

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
	const isDev = import.meta.env.DEV;

	if (!ErrorOverlay || isAlreadyAppear || !isDev) {
		return;
	}

	document.body.appendChild(new ErrorOverlay(error));
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
	showErrorOverlay(reason),
);
