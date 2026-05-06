import { AccountView } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
export const Route = createFileRoute("/account/$pathname")({
	component: Account,
});

function Account() {
	const { pathname } = Route.useParams();
	return (
		<div className="max-w-7xl mx-auto p-4">
			<AccountView pathname={pathname} />

			<Button>
				<Link to="/admin">Go to admin</Link>
			</Button>
		</div>
	);
}
