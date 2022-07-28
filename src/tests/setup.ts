/* eslint-disable -- something is missing on vitest package */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './mocks/server';
import { queryClient } from '~/libs/react-query';

// enable API mocking in test runs using the same request handlers as for the client-side mocking.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// general cleanup
afterEach(() => {
	queryClient.clear();
});
