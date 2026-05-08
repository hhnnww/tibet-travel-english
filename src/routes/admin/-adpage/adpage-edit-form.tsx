import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { TiptapField } from "#/lib/tiptap";
import { orpc } from "#/orpc/client";

export const AdPageEditForm = ({ id }: { id: number }) => {
	const adpage = useQuery(orpc.adpageGet.queryOptions({ input: { id: id } }));

	const updateAdpage = useMutation(orpc.adpageUpdate.mutationOptions());
	const form = useForm({
		defaultValues: adpage.data,
		onSubmit: async ({ value }) => {
			await updateAdpage.mutateAsync(value);
		},
	});

	const autoSave = useDebouncedCallback(async () => {
		await form.handleSubmit();
	}, 800);
	if (adpage.isFetching) return "loading...";
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>编辑广告页面提问</CardTitle>
				<CardDescription>自动保存，直接编辑即可</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent>
				<div className="flex flex-col gap-6 items-start p-6">
					<div className="flex flex-row gap-6 w-full">
						<div className="flex-3">
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
						</div>
						<div className="flex-3">
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
						</div>

						<div className="flex-4">
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
					</div>
					<form.Field name="title">
						{(field) => (
							<Field>
								<FieldLabel>标题</FieldLabel>
								<Input
									value={field.state.value}
									onChange={(e) => {
										field.handleChange(e.target.value);
										autoSave();
									}}
								/>
							</Field>
						)}
					</form.Field>

					<form.Field name="content">
						{(field) => (
							<Field>
								<FieldLabel>内容</FieldLabel>
								<TiptapField
									value={field.state.value}
									onChange={(value) => {
										field.handleChange(value);
										autoSave();
									}}
								/>
							</Field>
						)}
					</form.Field>
				</div>
			</CardContent>

			<CardFooter>
				<div className="text-muted-foreground">
					{updateAdpage.isPending ? "保存中..." : "已保存"}
				</div>
			</CardFooter>
		</Card>
	);
};
