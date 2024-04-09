import type {
	DefaultError,
	InfiniteData,
	QueryKey,
	UseInfiniteQueryOptions,
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Inspired by trpc `procedure` function,
 * but simplified to only create a query, infinite query, or mutation options.
 *
 * @usage
 * ```ts
 * const awesomeService = {
 *   list: procedure.query((params) => ({
 *     queryKey: ["key", params],
 *     queryFn: () => http.get("/awesome-service", { params }),
 *   })),
 *
 *   create: procedure.mutation(() => ({
 *     mutationFn: (data) => http.post("/awesome-service", data),
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["key"] }),
 *   })),
 * }
 *
 * const query = useQuery(awesomeService.list({ page: 1 }));
 * const mutation = useMutation(awesomeService.create());
 * ```
 */
export const procedure = {
	query: <TData = unknown, TParams = void>(
		options: (params: TParams) => UseQueryOptions<TParams, DefaultError, TData>,
	) => options,

	infinite: <TData = unknown>(
		options: () => UseInfiniteQueryOptions<
			TData,
			DefaultError,
			InfiniteData<TData>,
			TData,
			QueryKey,
			number
		>,
	) => options,

	mutation: <TData = unknown, TVariables = void>(
		options: () => UseMutationOptions<TData, DefaultError, TVariables, unknown>,
	) => options,
};
