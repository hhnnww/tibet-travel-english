import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Field, FieldLabel } from "#/components/ui/field";
import { cn } from "./utils";

export function RichEditor({
	title,
	value,
	onChange,
	onBlur,
}: {
	title?: string;
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
}) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
		onBlur: onBlur,
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value);
		}
	}, [value, editor]);

	return (
		<Field>
			<FieldLabel>{title}</FieldLabel>
			<EditorContent
				editor={editor}
				className={cn(
					"border rounded-md p-3 w-full [&_.ProseMirror]:min-h-50 [&_.ProseMirror]:whitespace-pre-wrap [&_.ProseMirror]:outline-none",
				)}
			/>
		</Field>
	);
}
