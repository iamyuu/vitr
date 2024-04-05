import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { PendingFallback } from "~/components/fallback";
import { queryClient } from "~/libs/tanstack-query";
import { config } from "~/libs/toast";

export function AppProviders(props: React.PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster {...config} />
			<Suspense fallback={<PendingFallback />}>{props.children}</Suspense>
		</QueryClientProvider>
	);
}
