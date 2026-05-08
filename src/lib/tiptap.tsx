import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImagePlus } from "lucide-react";
import { Button } from "#/components/ui/button";
import { cn } from "./utils";

export function TiptapField({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Image.configure({
				inline: false,
				allowBase64: true,
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	const addImage = () => {
		const url = window.prompt("输入图片 URL");

		if (url) {
			editor?.chain().focus().setImage({ src: url }).run();
		}
	};

	return (
		<div
			className={cn(
				"w-full border p-4 rounded-xl gap-4 flex flex-col items-start",
			)}
		>
			<Button type="button" onClick={addImage} size={"sm"}>
				<ImagePlus className="size-4" />
				插入图片
			</Button>

			<EditorContent
				editor={editor}
				className={cn(
					"[&_.ProseMirror]:min-h-40",
					"[&_.ProseMirror]:outline-none",
					"[&_.ProseMirror]:break-word",
					"[&_.ProseMirror]:whitespace-pre-wrap",
					"[&_.ProseMirror_img]:rounded-md",
					"[&_.ProseMirror_img]:max-w-full",

					"[&_.ProseMirror_img]:rounded-md",
					"[&_.ProseMirror_img]:max-w-50",
					"[&_.ProseMirror_img]:max-h-50",
					"[&_.ProseMirror_img]:object-contain",
				)}
			/>
		</div>
	);
}
