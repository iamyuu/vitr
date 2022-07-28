import { Suspense as ReactSuspense } from 'react';
import { PendingFallback, type PendingFallbackProps } from '~/components/ui/fallback/pending-fallback';

export type SuspenseProps = PendingFallbackProps;

export function Suspense({ children, ...restProps }: React.PropsWithChildren<SuspenseProps>) {
	return <ReactSuspense fallback={<PendingFallback {...restProps} />}>{children}</ReactSuspense>;
}
