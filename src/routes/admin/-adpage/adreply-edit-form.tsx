import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Separator } from "#/components/ui/separator";
import type { AdReply } from "#/db/schema";
import { TiptapField } from "#/lib/tiptap";
import { orpc } from "#/orpc/client";

export const AdReplyEditForm = ({
	adreply,
	index,
}: {
	adreply: typeof AdReply.$inferSelect;
	index: number;
}) => {
	const updateAdreply = useMutation(orpc.adreplyUpdate.mutationOptions());
	const form = useForm({
		defaultValues: adreply,
		onSubmit: async ({ value }) => {
			await updateAdreply.mutateAsync(value);
		},
	});

	const autoSave = useDebouncedCallback(async () => {
		await form.handleSubmit();
	}, 800);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle># {index + 1} 编辑广告回答</CardTitle>
				<CardDescription>自动保存，直接编辑即可</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent>
				<div className="grid grid-cols-4 gap-6 w-full p-6">
					<form.Field name="nikename">
						{(field) => (
							<Field className="w-full">
								<FieldLabel>昵称</FieldLabel>
								<Input
									value={field.state.value || ""}
									onChange={(e) => {
										field.handleChange(e.target.value);
										autoSave();
									}}
									className="w-full"
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="address">
						{(field) => (
							<Field>
								<FieldLabel>地址</FieldLabel>
								<Input
									value={field.state.value || ""}
									onChange={(e) => {
										field.handleChange(e.target.value);
										autoSave();
									}}
									className="w-full"
								/>
							</Field>
						)}
					</form.Field>

					<div className="col-span-2">
						<form.Field name="avatar">
							{(field) => (
								<Field>
									<FieldLabel>头像</FieldLabel>
									<Input
										value={field.state.value || ""}
										onChange={(e) => {
											field.handleChange(e.target.value);
											autoSave();
										}}
										className="w-full"
									/>
								</Field>
							)}
						</form.Field>
					</div>

					<form.Field name="star">
						{(field) => (
							<Field>
								<FieldLabel>星级</FieldLabel>
								<Input
									value={field.state.value || ""}
									onChange={(e) => {
										field.handleChange(Number(e.target.value));
										autoSave();
									}}
									className="w-full"
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="contributions">
						{(field) => (
							<Field>
								<FieldLabel>贡献</FieldLabel>
								<Input
									value={field.state.value || ""}
									onChange={(e) => {
										field.handleChange(Number(e.target.value));
										autoSave();
									}}
									className="w-full"
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="publishDate">
						{(field) => (
							<Field>
								<FieldLabel>发布时间</FieldLabel>
								<Input
									value={field.state.value || ""}
									onChange={(e) => {
										field.handleChange(Number(e.target.value));
										autoSave();
									}}
									className="w-full"
								/>
							</Field>
						)}
					</form.Field>
					<div className="col-span-4">
						<form.Field name="content">
							{(field) => (
								<Field>
									<FieldLabel>内容</FieldLabel>
									<TiptapField
										value={field.state.value || ""}
										onChange={(value) => {
											field.handleChange(value);
											autoSave();
										}}
									/>
								</Field>
							)}
						</form.Field>
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<div className="text-muted-foreground">
					{updateAdreply.isPending ? "保存中..." : "已保存"}
				</div>
			</CardFooter>
		</Card>
	);
};
