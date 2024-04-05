// import type { ErrorComponentProps } from "@tanstack/react-router";

// export function ErrorFallback(props: ErrorComponentProps) {
// 	return (
// 		<div role="alert" className="p-2">
// 			{props.error instanceof Error ? props.error.message : "An error occurred"}
// 		</div>
// 	);
// }

export { ErrorComponent as ErrorFallback } from "@tanstack/react-router";
