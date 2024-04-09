import type { Table } from "@tanstack/react-table";
import {
	Button,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui";
import { useDebounceFn } from "~/hooks/use-debounce";
import { cn } from "~/utils/misc";

import CrossIcon from "virtual:icons/lucide/circle-x";

interface Option {
	label: string;
	value: string;
}

export type DataTableFilterField<TData> =
	| {
			type: "text";
			label: string;
			value: keyof TData;
			placeholder?: string;
	  }
	| {
			type: "select";
			label: string;
			value: keyof TData;
			placeholder?: string;
			options: Option[];
	  }
	| {
			type: "multi-select";
			label: string;
			value: keyof TData;
			placeholder?: string;
			options: Option[];
	  };

export interface DataTableToolbarProps<TData>
	extends React.HTMLAttributes<HTMLDivElement> {
	table: Table<TData>;
	filterFields?: DataTableFilterField<TData>[];
}

export function DataTableToolbar<TData>({
	table,
	children,
	className,
	filterFields = [],
	...props
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	const getValue = (columnId: string) =>
		(table.getColumn(columnId)?.getFilterValue() as string) ?? "";

	const setFilter = useDebounceFn((columnId: string, newValue: string) =>
		table.getColumn(columnId)?.setFilterValue(newValue),
	);

	return (
		<div
			className={cn(
				"flex w-full items-center justify-between space-x-2 overflow-auto p-1",
				className,
			)}
			{...props}
		>
			<div className="flex flex-1 items-center space-x-2">
				{filterFields.length > 0
					? filterFields.map((field) => {
							if (!table.getColumn(field.value ? String(field.value) : "")) {
								return null;
							}

							if (field.type === "text") {
								return (
									<Input
										key={String(field.value)}
										placeholder={field.placeholder}
										defaultValue={getValue(String(field.value))}
										onChange={(event) =>
											setFilter(String(field.value), event.target.value)
										}
										className="h-8 w-40 lg:w-64"
									/>
								);
							}

							if (field.type === "select") {
								return (
									<Select
										key={String(field.value)}
										defaultValue={getValue(String(field.value))}
										onValueChange={(value) =>
											setFilter(String(field.value), value)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder={field.placeholder} />
										</SelectTrigger>
										<SelectContent>
											{field.options.map((option) => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								);
							}

							return null;
						})
					: null}

				{isFiltered && (
					<Button
						aria-label="Reset filters"
						variant="ghost"
						className="h-8 px-2 lg:px-3"
						onClick={() => table.resetColumnFilters()}
					>
						Reset
						<CrossIcon className="ml-2 size-4" aria-hidden="true" />
					</Button>
				)}
			</div>

			{children}
		</div>
	);
}
