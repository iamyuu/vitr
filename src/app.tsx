import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, RouterProvider, createBrowserRouter as createRouter } from 'react-router-dom';
import { useError } from '~/hooks/use-error';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

function AppPendingFallback() {
	return <div>Loading...</div>;
}

function AppErrorFallback() {
	const error = useError();

	return (
		<Alert variant='destructive'>
			<AlertTitle>{error.reason}</AlertTitle>
			<AlertDescription>{error.message}</AlertDescription>
		</Alert>
	);
}

function AppRoot() {
	// TODO: the layout goes here
	return <Outlet />;
}

const router = createRouter([
	{
		path: '/',
		// loader: async () => {
		// 	await queryClient.prefetchQuery(sessionQuery);
		// 	return null;
		// },
		element: <AppRoot />,
		errorElement: <AppErrorFallback />,
		children: [
			{
				path: '/',
				element: <div>Home</div>,
			},
		],
	},
]);

export function App() {
	return (
		<>
			<ReactQueryDevtools position='bottom-right' />
			<RouterProvider fallbackElement={<AppPendingFallback />} router={router} />
		</>
	);
}
