import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ThemeProvider } from 'ui';
import { PendingFallback } from '~/components/fallback/pending';
import { getQueryClient } from '~/utils/query-client';

export function AppProviders(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ThemeProvider>
        <Suspense fallback={<PendingFallback />}>{props.children}</Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
