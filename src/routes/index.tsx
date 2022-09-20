import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PendingFallback } from '~/components/ui/fallback';

// TODO: provide root fallback
const router = createBrowserRouter([
	{
		path: '/',
		element: <h1>Hello World!</h1>,
	},
]);

export function AppRoutes() {
	return <RouterProvider fallbackElement={<PendingFallback />} router={router} />;
}
