import type { Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { DEFAULT_PAGE_SIZE_OPTIONS } from "~/constants/data-table";

import ChevronLeftIcon from "virtual:icons/lucide/chevron-left";
import ChevronRightIcon from "virtual:icons/lucide/chevron-right";

export interface DataTablePaginationProps<TData> {
	table: Table<TData>;
	pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
	table,
	pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: DataTablePaginationProps<TData>) {
	return (
		<div className="flex flex-col-reverse items-center gap-4 justify-between sm:flex-row sm:gap-6 lg:gap-8">
			<div className="flex items-center space-x-2">
				<p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger className="h-8 w-[4.5rem]">
						<SelectValue placeholder={table.getState().pagination.pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{pageSizeOptions.map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center space-x-2">
				<div className="flex items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						aria-label="Go to previous page"
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeftIcon className="size-4" aria-hidden="true" />
					</Button>
					<Button
						aria-label="Go to next page"
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRightIcon className="size-4" aria-hidden="true" />
					</Button>
				</div>
			</div>
		</div>
	);
}
