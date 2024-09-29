// import type { NotFoundRouteProps } from '@tanstack/react-router';
import { Link, useRouter } from '@tanstack/react-router';
import { Button, buttonStyles } from 'ui';

export function NotFoundFallback() {
  const router = useRouter();

  return (
    <section aria-label="Not Found" className="flex flex-col items-center justify-center space-y-6 pt-16 text-center">
      <div className="space-y-2">
        <h1 className="text-heading-4">Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>

      <div className="space-x-2">
        <Button onClick={() => router.history.back()}>Go back</Button>
        <Link className={buttonStyles({ appearance: 'ghost' })} to="/">
          Go to home
        </Link>
      </div>
    </section>
  );
}
