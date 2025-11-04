<<<<<<< HEAD
// app/admin/editplace/Editor.tsx
=======
// app/admin/editplace/RichEditor.tsx
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
<<<<<<< HEAD
import { TextStyle } from "@tiptap/extension-text-style";
=======
import {TextStyle} from "@tiptap/extension-text-style";
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";

<<<<<<< HEAD
interface EditorProps {
=======
interface RichEditorProps {
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  value: string;
  onChange: (v: string) => void;
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
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
<<<<<<< HEAD
        class: "prose prose-lg min-h-[350px] p-3 focus:outline-none",
      },
    },
=======
        class:
          "prose prose-lg focus:outline-none min-h-[400px] p-3",
      },
    },
    autofocus: true,
    placeholder: "Scrie articolul tău aici...",
    immediatelyRender: false,
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
  });

  if (!editor) return null;

<<<<<<< HEAD
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
=======
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
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
    </div>
  );
}
