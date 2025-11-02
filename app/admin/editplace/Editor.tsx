// app/admin/editplace/RichEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {TextStyle} from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";

interface RichEditorProps {
  value: string;
  onChange: (v: string) => void;
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }), // dezactivăm heading implicit
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: node => {
          switch (node.attrs.level) {
            case 1:
              return { class: "text-4xl font-bold my-4" };
            case 2:
              return { class: "text-3xl font-semibold my-3" };
            case 3:
              return { class: "text-2xl font-medium my-2" };
            default:
              return {};
          }
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
        class:
          "prose prose-lg focus:outline-none min-h-[400px] p-3",
      },
    },
    autofocus: true,
    placeholder: "Scrie articolul tău aici...",
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-md p-3 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          H3
        </button>
        <button
          onClick={() => {
            const url = prompt("Introdu URL-ul");
            if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Link
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Listă
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Listă ordonată
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Quote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          Code
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="min-h-[400px] p-3 border rounded prose prose-lg focus:outline-none" />
    </div>
  );
}
