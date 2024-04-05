import type { Toaster } from "sonner";

export { toast } from "sonner";

export const config: Parameters<typeof Toaster>[0] = {
	closeButton: true,
	richColors: true,
	position: "bottom-right",
};
