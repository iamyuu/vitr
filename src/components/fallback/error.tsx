import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Button, buttonStyles } from 'ui';

export function ErrorFallback(props: ErrorComponentProps) {
  const resetQuery = useQueryErrorResetBoundary();
  const reason = props.error instanceof Error ? props.error.message : 'An error occurred';

  return (
    <section
      aria-label="Error"
      className="flex flex-col items-center justify-center space-y-6 pt-16 text-center"
      role="alert"
    >
      <div className="space-x-2">
        <h1 className="text-heading-4">Oops!</h1>
        <p>{reason}</p>
      </div>

      <div className="space-x-1">
        <Button
          onClick={() => {
            resetQuery.reset();
            props.reset();
          }}
        >
          Try again
        </Button>
        <Link className={buttonStyles({ appearance: 'ghost' })} to="/" onClick={() => resetQuery.reset()}>
          Go to home
        </Link>
      </div>
    </section>
  );
}
