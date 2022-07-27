import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { AppProviders } from '~/providers/app';

export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';

/**
 * Override rtl render to add default wrapper
 */
export function render(ui: React.ReactElement, options: RenderOptions = {}) {
	return rtlRender(ui, { wrapper: AppProviders, ...options });
}

/**
 * Utils for waiting loading to finish
 */
export function waitForLoadingToFinish() {
	return waitForElementToBeRemoved(
		() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)],
		{
			timeout: 4000,
		},
	);
}
