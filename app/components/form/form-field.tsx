import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import type { FieldValues, UseFormGetFieldState } from "react-hook-form";
import { Label } from "~/components/ui/label";

export interface FormFieldProps
	extends React.HTMLAttributes<HTMLElement>,
		ReturnType<UseFormGetFieldState<FieldValues>> {
	label: string;
	description?: string;
}

export const FormField = React.forwardRef<HTMLElement, FormFieldProps>(
	({ invalid, isDirty, isTouched, isValidating, error, ...props }, ref) => {
		const id = React.useId();
		const formItemId = `${id}-form-item`;
		const formMessageId = `${id}-form-item-message`;
		const formDescriptionId = props?.description
			? `${id}-form-item-description`
			: "";

		return (
			<div className="space-y-2">
				<Label
					className={invalid ? "text-destructive" : ""}
					htmlFor={formItemId}
				>
					{props.label}
				</Label>

				<Slot
					ref={ref}
					id={formItemId}
					aria-describedby={
						!invalid
							? `${formDescriptionId}`
							: `${formDescriptionId} ${formMessageId}`
					}
					aria-invalid={!!invalid}
					{...props}
				/>

				{props?.description ? (
					<p id={formDescriptionId} className="text-sm text-muted-foreground">
						{props.description}
					</p>
				) : null}

				{invalid ? (
					<p
						id={formMessageId}
						className="text-sm font-medium text-destructive"
					>
						{error?.message}
					</p>
				) : null}
			</div>
		);
	},
);
FormField.displayName = "FormField";
