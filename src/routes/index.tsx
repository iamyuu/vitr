import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
	return useRoutes([
		{
			path: '/',
			element: <h1>Hello World!</h1>,
		},
	]);
}
