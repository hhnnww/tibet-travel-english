import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "#/lib/auth";
import { setMode } from "#/lib/set-theme-mode";

export const Route = createFileRoute("/_authLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	useEffect(() => {
		setMode("dark");
		document.documentElement.classList.add("dark");
	});

	return (
		<NeonAuthUIProvider authClient={authClient}>
			<Outlet />
		</NeonAuthUIProvider>
	);
}
