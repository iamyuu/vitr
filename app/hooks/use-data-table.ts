import { useRouter } from "@tanstack/react-router";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type TableOptions,
	functionalUpdate,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { DataTableProps } from "~/components/data-table";
import type { DataTableFilterField } from "~/components/data-table/data-table-toolbar";

interface UseDataTableOptions<TData, TValue>
	extends Partial<TableOptions<TData>> {
	/**
	 * The data for the table.
	 */
	data: TData[];

	/**
	 * The columns of the table.
	 */
	columns: ColumnDef<TData, TValue>[];

	/**
	 * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
	 * The indie filter field `value` represents the corresponding column name in the database table.
	 *
	 * @default []
	 * @example
	 * ```ts
	 * // Render a search filter
	 * const filterFields = [
	 *   { type: "text", label: "Title", value: "title", placeholder: "Search title..." }
	 * ];
	 * // Render a faceted filter
	 * const filterFields = [
	 *   {
	 *     type: "multi-select",
	 *     label: "Status",
	 *     value: "status",
	 *     options: [
	 *       { label: "Draft", value: "draft" },
	 *       { label: "In Review", value: "in-review" },
	 *       { label: "Rejected", value: "reject" }
	 *       { label: "Published", value: "publish" },
	 *     ]
	 *   }
	 * ];
	 * ```
	 */
	filterFields?: DataTableFilterField<TData>[];
}

export function useDataTable<TData, TValue>(
	options: UseDataTableOptions<TData, TValue>,
) {
	const router = useRouter();
	const searchParams = new URLSearchParams(router.history.location.search);

	const pagination: PaginationState = {
		pageIndex: Number(searchParams.get("pageIndex") ?? 1),
		pageSize: Number(searchParams.get("pageSize") ?? 10),
	};

	const columnFilters: ColumnFiltersState = [];

	searchParams.forEach((value, key) => {
		if (key === "pageIndex" || key === "pageSize") return;

		columnFilters.push({
			id: key,
			value,
		});
	});

	const table = useReactTable({
		data: options.data,
		columns: options.columns,
		pageCount: options.pageCount,

		state: {
			pagination,
			columnFilters,
		},

		// Set `true` to reset the pagination to the first page when page-altering state changes (e.g. filters change, etc.)
		autoResetPageIndex: options.autoResetPageIndex ?? true,
		manualPagination: true,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: (updaterOrValue) => {
			const nextState = functionalUpdate(updaterOrValue, pagination);

			router.navigate({
				search: (prev) => ({
					// Keep the existing search params, but update the pagination
					...prev,
					page_size: nextState.pageSize,
					page_index: nextState.pageIndex,
				}),
			});
		},

		manualFiltering: true,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnFiltersChange: (updaterOrValue) => {
			const nextState = functionalUpdate(updaterOrValue, columnFilters).reduce(
				(acc, filter) =>
					Object.assign({}, acc, {
						[filter.id]: filter.value,
					}),
				{},
			);

			router.navigate({
				// Serialize the column filters to the URL search params
				search: nextState,
			});
		},

		getCoreRowModel: getCoreRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return {
		table,

		/**
		 * Set the props for the `DataTable` component
		 */
		getDataTableProps: () =>
			({
				table,
			}) satisfies DataTableProps<TData>,

		/**
		 * Set the props for the `DataTableToolbar` component
		 */
		getDataTableToolbarProps: () => ({
			table,
			filterFields: options.filterFields,
		}),
	};
}
