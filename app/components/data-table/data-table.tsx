import { type Table as TanstackTable, flexRender } from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

export interface DataTableProps<TData> {
	/**
	 * The table instance returned from useReactTable hook with pagination, sorting, filtering, etc.
	 */
	table: TanstackTable<TData>;

	/**
	 * Whether the table is in a pending transition state.
	 * e.g. when user is navigating to a different page or applying filters.
	 */
	isPendingTransition?: boolean;

	/**
	 * A custom empty state to render when there are no rows in the table.
	 * If not provided, a default empty state will be rendered.
	 */
	renderEmptyState?: () => React.ReactNode;
}

export function DataTable<TData>({
	table,
	renderEmptyState,
	isPendingTransition,
}: DataTableProps<TData>) {
	const emptyState = renderEmptyState ? (
		renderEmptyState()
	) : (
		<TableRow>
			<TableCell
				colSpan={table.getAllColumns().length}
				className="h-24 text-center"
			>
				No results.
			</TableCell>
		</TableRow>
	);

	return (
		<div className="w-full space-y-2.5 overflow-auto">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="capitalize">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody className={isPendingTransition ? "opacity-50" : ""}>
						{table.getRowModel().rows?.length
							? table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							: renderEmptyState
								? renderEmptyState()
								: emptyState}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-col gap-2.5">
				<DataTablePagination table={table} />
			</div>
		</div>
	);
}
