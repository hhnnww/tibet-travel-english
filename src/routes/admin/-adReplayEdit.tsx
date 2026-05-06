import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferSelectModel } from "drizzle-orm";
import { useRef, useState } from "react";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import type { AdReplay } from "#/db/schema";
import { RichEditor } from "#/lib/tiptap-richeditor";
import { orpc } from "#/orpc/client";

type AdReplaySchema = InferSelectModel<typeof AdReplay>;

export const AdReplayEdit = ({ item }: { item: AdReplaySchema }) => {
	const queryClient = useQueryClient();

	const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
		"idle",
	);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const updateReplay = useMutation(
		orpc.updateAdReply.mutationOptions({
			onMutate: async (newData) => {
				setStatus("saving");

				// 🔥 乐观更新
				await queryClient.cancelQueries({
					queryKey: orpc.listAdReplys.queryKey({ input: {} }),
				});

				const prev = queryClient.getQueryData(
					orpc.listAdReplys.queryKey({ input: {} }),
				);

				queryClient.setQueryData(
					orpc.listAdReplys.queryKey({ input: {} }),
					(old: AdReplaySchema[] = []) =>
						old.map((it) =>
							it.id === newData.id ? { ...it, ...newData } : it,
						),
				);

				return { prev };
			},

			onError: (_err, _newData, context) => {
				setStatus("error");

				// ❗ 回滚
				if (context?.prev) {
					queryClient.setQueryData(
						orpc.listAdReplys.queryKey({ input: {} }),
						context.prev,
					);
				}
			},

			onSuccess: () => {
				setStatus("saved");

				setTimeout(() => {
					setStatus("idle");
				}, 1500);
			},
		}),
	);

	const form = useForm({
		defaultValues: item,
		onSubmit: async ({ value }) => {
			await updateReplay.mutateAsync(value);
		},
	});

	// 🔥 防抖自动保存
	const autoSave = () => {
		if (!form.state.isDirty) return;

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			form.handleSubmit();
		}, 600);
	};

	return (
		<div className="w-full flex flex-col gap-3 pl-12">
			<form.Field name="title">
				{(field) => (
					<Field>
						<FieldLabel>标题</FieldLabel>
						<Input
							className="text-lg font-semibold border-none shadow-none focus-visible:ring-0"
							value={field.state.value ?? ""}
							onChange={(e) => {
								field.handleChange(e.target.value);
								autoSave();
							}}
						/>
					</Field>
				)}
			</form.Field>

			{/* 内容 */}
			<form.Field name="content">
				{(field) => (
					<RichEditor
						value={field.state.value ?? ""}
						title="内容"
						onChange={(val) => {
							field.handleChange(val);
							autoSave();
						}}
					/>
				)}
			</form.Field>

			{/* 状态提示（Notion 精髓） */}
			<div className="text-xs text-gray-400 flex items-center gap-2 h-4">
				{status === "saving" && (
					<>
						<Spinner data-icon="inline-start" />
						保存中...
					</>
				)}

				{status === "saved" && "已保存"}

				{status === "error" && <span className="text-red-500">保存失败</span>}
			</div>
		</div>
	);
};
