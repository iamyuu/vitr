import { AppProviders } from '~/providers/app-providers';
import { RouterProvider } from '~/providers/router-provider';
import './bootstrap';

export function App() {
  return (
    <AppProviders>
      <RouterProvider />
    </AppProviders>
  );
}
