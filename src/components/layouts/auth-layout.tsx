import { Outlet } from '@tanstack/react-router';

export function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  );
}
