"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import HardBreak from "@tiptap/extension-hard-break";

export default function TiptapEditor({
                                         value,
                                         onChange,
                                     }: {
    value: string;
    onChange: (value: string) => void;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                hardBreak: false,
            }),

            HardBreak,

            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value,
        immediatelyRender: false,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="border rounded overflow-hidden">
            <div className="flex gap-[8px] p-[12px] border-b">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="border px-[10px] py-[4px] rounded"
                >
                    Bold
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="border px-[10px] py-[4px] rounded"
                >
                    Italic
                </button>


                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className="border px-[10px] py-[4px] rounded"
                >
                    Center
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className="border px-[10px] py-[4px] rounded"
                >
                    Left
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className="border px-[10px] py-[4px] rounded"
                >
                    Right
                </button>

            </div>


            <EditorContent
                editor={editor}
                className="
        min-h-[520px]
        p-[16px]
        prose
        prose-neutral
        max-w-none
        prose-p:my-8
    "
            />
        </div>
    );
}