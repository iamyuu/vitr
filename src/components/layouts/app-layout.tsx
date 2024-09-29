import { Outlet } from '@tanstack/react-router';

export function AppLayout() {
  return (
    <main className="p-6">
      <Outlet />
    </main>
  );
}
