import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Undo2 } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Item, ItemContent, ItemMedia } from "#/components/ui/item";
import { Spinner } from "#/components/ui/spinner";
import { Switch } from "#/components/ui/switch";
import { orpc } from "#/orpc/client";

export const Route = createFileRoute("/_authLayout/admin/adsaler-edit/$id")({
	component: RouteComponent,
	loader: async (ctx) => {
		await ctx.context.queryClient.prefetchQuery(
			orpc.adSalerRoute.get.queryOptions({
				input: {
					id: Number(ctx.params.id),
				},
			}),
		);
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const query = useQuery(
		orpc.adSalerRoute.get.queryOptions({
			input: {
				id: Number(params.id),
			},
		}),
	);
	const mutation = useMutation(orpc.adSalerRoute.update.mutationOptions());
	const form = useForm({
		defaultValues: query.data,
		onSubmit: async (values) => {
			await mutation.mutateAsync(values.value);
		},
	});
	const autoSave = useDebouncedCallback(async () => {
		await form.handleSubmit();
	}, 800);
	return (
		<div className="grid grid-cols-12 gap-12">
			<div className="col-span-12">
				<Link to="/admin/adsaler">
					<Button>
						<Undo2 />
						back
					</Button>
				</Link>
			</div>

			<div className="col-span-12">
				<Card>
					<CardHeader>
						<CardTitle>编辑销售</CardTitle>
					</CardHeader>
					<CardContent>
						<form>
							<div className="grid grid-cols-12 gap-8">
								<form.Field name="avatar">
									{(field) => (
										<Field className="col-span-12">
											<FieldLabel>销售头像</FieldLabel>
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
								<form.Field name="name">
									{(field) => (
										<Field className="col-span-4">
											<FieldLabel>名称</FieldLabel>
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

								<form.Field name="phone">
									{(field) => (
										<Field className="col-span-4">
											<FieldLabel>手机</FieldLabel>
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

								<form.Field name="wechat">
									{(field) => (
										<Field className="col-span-4">
											<FieldLabel>微信</FieldLabel>
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

								<form.Field name="email">
									{(field) => (
										<Field className="col-span-4">
											<FieldLabel>邮箱</FieldLabel>
											<Input
												type="email"
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

								<form.Field name="whatapp">
									{(field) => (
										<Field className="col-span-4">
											<FieldLabel>WhatsApp</FieldLabel>
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

								<form.Field name="wechat_erweima">
									{(field) => (
										<Field className="col-span-12">
											<FieldLabel>微信二维码链接/ID</FieldLabel>
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

								<form.Field name="whatapp_erweima">
									{(field) => (
										<Field className="col-span-12">
											<FieldLabel>WhatsApp二维码链接/ID</FieldLabel>
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

								<form.Field name="state">
									{(field) => (
										<Field
											orientation="vertical"
											className={`${field.state.value && "bg-primary text-white"} col-span-12 p-4 border rounded-2xl`}
										>
											<FieldContent>
												<FieldTitle>
													{field.state.value ? "已启用" : "已禁用"}
												</FieldTitle>
												<FieldDescription>
													<div
														className={`${field.state.value && "text-white"}`}
													>
														如果选择禁用，前台销售轮换中就不会出现这个销售
													</div>
												</FieldDescription>
											</FieldContent>
											<Switch
												id="switch-share"
												checked={field.state.value as boolean}
												onCheckedChange={(checked) => {
													field.handleChange(checked);
													autoSave();
												}}
											/>
										</Field>
									)}
								</form.Field>

								<div className="col-span-12">
									<Item variant="outline" size="sm">
										<ItemMedia>
											{mutation.isPending ? (
												<Spinner data-icon="inline-start" />
											) : (
												<Check className="size-5" />
											)}
										</ItemMedia>
										<ItemContent>
											{mutation.isPending ? "保存中..." : "已保存"}
										</ItemContent>{" "}
									</Item>
								</div>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
