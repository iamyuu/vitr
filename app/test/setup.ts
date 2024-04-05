// jest-dom adds custom jest matchers for asserting on DOM nodes
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";
import { queryClient } from "~/libs/tanstack-query";
import { server } from "./mocks/server";

// Enable API mocking in test runs using the same request handlers as for the client-side mocking
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// General cleanup
afterEach(() => {
	queryClient.clear();
});
