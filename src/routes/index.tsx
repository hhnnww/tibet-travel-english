import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-4">
			<Field>
				<FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
				<Input id="input-demo-api-key" type="password" placeholder="sk-..." />
				<FieldDescription>
					Your API key is encrypted and stored securely.
				</FieldDescription>
			</Field>

			<Button>fuckyou</Button>
		</div>
	);
}
