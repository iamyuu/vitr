import { sentryVitePlugin as sentry } from '@sentry/vite-plugin';
import { TanStackRouterVite as router } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import unoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import tsPaths from 'vite-tsconfig-paths';
import { defaultExclude } from 'vitest/config';

const sentryToken = process.env.VITE_SENTRY_AUTH_TOKEN;

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },

  build: {
    sourcemap: !!sentryToken,
  },

  plugins: [
    router({
      routesDirectory: 'src/routes',
      generatedRouteTree: 'src/generated/route.ts',
      autoCodeSplitting: true,
      semicolons: true,
      routeTreeFileHeader: ['// @ts-nocheck', '// biome-ignore format: generated file'],
      routeTreeFileFooter: [],
    }),

    react(),

    unoCSS(),

    tsPaths(),

    sentry({
      url: process.env.VITE_SENTRY_URL,
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,
      disable: !sentryToken,
      authToken: sentryToken,
      sourcemaps: {
        filesToDeleteAfterUpload: ['./build/client/assets/**/*.js.map'],
      },
    }),
  ],

  test: {
    css: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
    includeSource: ['src/**/*.{js,ts}'],
    exclude: [...defaultExclude, '**/e2e/**'],
    browser: {
      name: 'chromium',
      provider: 'playwright',
    },
    coverage: {
      enabled: true,
      provider: 'istanbul',
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,

        'src/utils/**.ts': { 100: true },
      },
      include: ['src/**'],
      exclude: [
        'src/app.tsx',
        'src/entry.tsx',
        'src/types/reset.d.ts',
        'src/constants/**',
        'src/providers/router-provider.tsx',
        'src/routes/__root.tsx',
        'src/generated/**',
        'src/utils/query-client.ts',
        'src/tests/**',
      ],
      reporter: ['html', 'text-summary', 'json-summary'],
      reportOnFailure: true,
    },
  },
});
