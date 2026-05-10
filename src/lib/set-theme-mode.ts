import { createClientOnlyFn } from "@tanstack/react-start";

export const setMode = createClientOnlyFn((mode: "light" | "dark") => {
	localStorage.setItem("theme", mode);
});
