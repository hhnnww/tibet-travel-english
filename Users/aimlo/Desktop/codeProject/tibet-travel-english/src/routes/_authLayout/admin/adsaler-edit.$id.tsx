import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { orpc } from "#/orpc/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// 假设你有一个 toast 组件用于提示保存状态
// import { useToast } from "@/hooks/use-toast";

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
	// const { toast } = useToast(); // 如果有 toast

	const query = useQuery(
		orpc.adSalerRoute.get.queryOptions({
			input: {
				id: Number(params.id),
			},
		}),
	);

	const mutation = useMutation(orpc.adSalerRoute.update.mutationOptions());

	const form = useForm({
		defaultValues: query.data || {},
		onSubmit: async (values) => {
			try {
				await mutation.mutateAsync(values.value);
				// toast({ title: "Saved successfully" });
			} catch (error) {
				console.error(error);
				// toast({ variant: "destructive", title: "Save failed" });
			}
		},
	});

	// 自动保存逻辑：监听表单数据变化，防抖后提交
	// 注意：@tanstack/react-form 的状态管理可能需要通过 subscribe 或 effect 来监听整体变化
	// 这里使用一个简单的 effect 监听 form.state.values 的变化

	useEffect(() => {
		if (!query.data) return;

		// 简单的防抖自动保存
		const timeoutId = setTimeout(() => {
			// 只有当表单有改动且不是初始加载时才保存
			// @tanstack/react-form 提供了 isDirty 等状态
			if (form.state.isDirty) {
				form.handleSubmit();
			}
		}, 1000); // 1秒防抖

		return () => clearTimeout(timeoutId);
	}, [form.state.values, form.state.isDirty, form.handleSubmit, query.data]);

	if (query.isLoading) {
		return <div>Loading...</div>;
	}

	if (query.isError) {
		return <div>Error loading ad saler data.</div>;
	}

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<Card>
				<CardHeader>
					<CardTitle>Edit Ad Saler</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						{/* 
                           注意：以下字段仅为示例，请根据 orpc.adSalerRoute.get 返回的实际字段进行调整 
                           假设返回结构包含: id, name, contactPerson, phone, email, commissionRate
                        */}

						<form.Field name="name">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>Name</Label>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value ?? ""}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Ad Saler Name"
									/>
								</div>
							)}
						</form.Field>

						<form.Field name="contactPerson">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>Contact Person</Label>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value ?? ""}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Contact Person"
									/>
								</div>
							)}
						</form.Field>

						<form.Field name="phone">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>Phone</Label>
									<Input
										id={field.name}
										name={field.name}
										value={field.state.value ?? ""}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Phone Number"
									/>
								</div>
							)}
						</form.Field>

						<form.Field name="email">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>Email</Label>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										value={field.state.value ?? ""}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Email Address"
									/>
								</div>
							)}
						</form.Field>

						<form.Field name="commissionRate">
							{(field) => (
								<div className="space-y-2">
									<Label htmlFor={field.name}>Commission Rate (%)</Label>
									<Input
										id={field.name}
										name={field.name}
										type="number"
										step="0.01"
										value={field.state.value ?? ""}
										onChange={(e) =>
											field.handleChange(parseFloat(e.target.value))
										}
										placeholder="0.00"
									/>
								</div>
							)}
						</form.Field>

						<div className="flex justify-end pt-4">
							<Button type="submit" disabled={mutation.isPending}>
								{mutation.isPending ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
