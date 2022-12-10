import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig({
	// https://vitejs.dev/config/server-options.html
	server: {
		port: 3000,
	},

	resolve: {
		// https://vitejs.dev/config/shared-options.html#resolve-alias
		alias: {
			'~': resolve('src'),
		},
	},

	plugins: [
		// https://github.com/vitejs/vite/tree/main/packages/plugin-react
		react(),
	],
});
