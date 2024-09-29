// Extends Vitest's expect method from react-testing-library for asserting on DOM nodes
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { getQueryClient } from '~/utils/query-client';

import { server } from '~/tests/mocks/server';

// Enable API mocking in test runs using the same request handlers as for the client-side mocking
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// General cleanup
afterEach(() => {
  cleanup();
  getQueryClient().clear();
});
