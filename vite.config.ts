/// <reference types="vitest" />

import { resolve } from "node:path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
	// https://vitejs.dev/config/server-options.html
	server: {
		port: 3000,
	},

	resolve: {
		// https://vitejs.dev/config/shared-options.html#resolve-alias
		alias: {
			"~": resolve("app"),
		},
	},

	plugins: [
		// https://tanstack.com/router/v1/docs/framework/react/guide/file-based-routing#options
		TanStackRouterVite({
			routesDirectory: "app/routes",
			generatedRouteTree: "app/generated/route.ts",
			routeFileIgnorePrefix: "-",
			quoteStyle: "double",
			semicolons: true,
		}),

		// https://github.com/vitejs/vite-plugin-react-swc
		react(),
	],

	// https://vitest.dev/config
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: "./app/test/setup.ts",
		coverage: {
			include: ["app/**"],
			exclude: ["app/test/**", "app/generated/**"],
			reporter: ["html", "text-summary", "json-summary", "json"],
			reportOnFailure: true,
		},
	},
});
