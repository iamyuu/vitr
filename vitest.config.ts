import { defineConfig } from 'vitest/config';

// https://vitest.dev/config
export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./src/tests/setup.ts'],
	},
});
