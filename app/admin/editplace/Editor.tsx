// app/admin/editplace/Editor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";

interface EditorProps {
  value: string;
  onChange: (v: string) => void;
}

type HeadingNode = {
  attrs: {
    level: 1 | 2 | 3;
  };
};

export default function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: (node: HeadingNode) => {
          const styles: Record<1 | 2 | 3, { class: string }> = {
            1: { class: "text-4xl font-bold my-4" },
            2: { class: "text-3xl font-semibold my-3" },
            3: { class: "text-2xl font-medium my-2" },
          };

          return styles[node.attrs.level] ?? {};
        },
      }),
      Underline,
      Link.configure({ openOnClick: true }),
      TextStyle,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-lg min-h-[350px] p-3 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  const buttons = [
    { label: "B", cmd: () => editor.chain().focus().toggleBold().run() },
    { label: "I", cmd: () => editor.chain().focus().toggleItalic().run() },
    { label: "U", cmd: () => editor.chain().focus().toggleUnderline().run() },
    { label: "H1", cmd: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "H2", cmd: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "H3", cmd: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    {
      label: "Link",
      cmd: () => {
        const url = prompt("URL:");
        if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
      },
    },
    { label: "• List", cmd: () => editor.chain().focus().toggleBulletList().run() },
    { label: "1. List", cmd: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "Quote", cmd: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "Code", cmd: () => editor.chain().focus().toggleCodeBlock().run() },
  ];

  return (
    <div className="border rounded-md bg-white shadow-sm p-3">
      <div className="flex flex-wrap gap-2 mb-3">
        {buttons.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={b.cmd}
            className="px-2 py-1 border rounded hover:bg-gray-100"
          >
            {b.label}
          </button>
        ))}
      </div>

      <EditorContent editor={editor} className="min-h-[350px]" />
    </div>
  );
}
