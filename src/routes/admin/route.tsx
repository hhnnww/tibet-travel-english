import {
	RedirectToSignIn,
	SignedIn,
	UserButton,
} from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<div className="border-b bg-background">
				<div className="flex justify-between p-4 items-center">
					<div className="">tibet admin</div>
					<div className="flex gap-4">
						<Link to="/admin/adpage">广告页面</Link>
						<Link to="/admin/aduser">用户</Link>
					</div>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>

				<RedirectToSignIn />
			</div>

			<div className="max-w-7xl mx-auto p-10 ">
				<Outlet />
			</div>
		</>
	);
}
