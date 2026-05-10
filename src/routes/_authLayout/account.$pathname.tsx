import { AccountView } from "@neondatabase/auth-ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_authLayout/account/$pathname")({
	component: Account,
});

function Account() {
	const { pathname } = Route.useParams();
	return (
		<div className="min-h-screen w-full flex items-center justify-center">
			<div className="flex flex-col gap-8 items-start">
				<div>
					<AccountView pathname={pathname} />
				</div>
				<Button>
					<Link to={"/admin"}>Back</Link>
				</Button>
			</div>
		</div>
	);
}
