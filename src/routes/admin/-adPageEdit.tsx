import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferSelectModel } from "drizzle-orm";
import { Button } from "#/components/ui/button";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Spinner } from "#/components/ui/spinner";
import type { Adpages } from "#/db/schema";
import { RichEditor } from "#/lib/tiptap-richeditor";
import { orpc } from "#/orpc/client";

type AdPage = InferSelectModel<typeof Adpages>;

export const AdPageEdit = ({ item }: { item: AdPage }) => {
	const savePageMutation = useMutation(orpc.updateAdPage.mutationOptions({}));
	const form = useForm({
		defaultValues: item,
		onSubmit: async ({ value }) => {
			console.log("submit", value);
			await savePageMutation.mutateAsync(value);
		},
	});
	const adUsers = useQuery(orpc.listAdUsers.queryOptions({ input: {} }));
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="w-full flex gap-4 flex-col items-start"
		>
			<form.Field name="title">
				{(field) => (
					<Field>
						<FieldLabel>标题</FieldLabel>
						<Input
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</Field>
				)}
			</form.Field>

			<form.Field name="content">
				{(field) => (
					<RichEditor value={field.state.value} onChange={field.handleChange} />
				)}
			</form.Field>

			<form.Field name="userId">
				{(field) => (
					<Field>
						<FieldLabel htmlFor="userId">关联用户</FieldLabel>
						<Select
							value={field.state.value ? String(field.state.value) : undefined}
							onValueChange={(e) => field.handleChange(Number(e))}
						>
							<SelectTrigger className="w-full max-w-48">
								<SelectValue placeholder="Select a fruit" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{adUsers.data?.map((user) => (
										<SelectItem key={user.id} value={String(user.id)}>
											<div className="flex gap-2">
												<div className="">{user.nikename}</div>
												<div className="text-sm text-muted-foreground">
													{user.address}
												</div>
											</div>
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>
				)}
			</form.Field>
			<form.Subscribe>
				{({ canSubmit, isSubmitting }) => (
					<Button disabled={!canSubmit} type="submit">
						{isSubmitting && <Spinner data-icon="inline-start" />}
						保存
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
};
