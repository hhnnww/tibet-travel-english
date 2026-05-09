import {
	RedirectToSignIn,
	SignedIn,
	UserButton,
} from "@neondatabase/neon-js/auth/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<div className="flex justify-between items-center p-4">
				<div className="flex gap-8 items-center">
					<Link className="text-xl uppercase" to="/admin">
						admin
					</Link>
					<div className="flex gap-6">
						<Link to="/admin/adpage">广告页面</Link>
						<Link to="/admin/adsaler">销售</Link>
						<Link to="/admin/images/$page" params={{ page: "1" }}>
							图片空间
						</Link>
					</div>
				</div>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>

			<div className="max-w-300 mx-auto p-6">
				<Outlet />
			</div>
			<RedirectToSignIn />
		</>
	);
}
