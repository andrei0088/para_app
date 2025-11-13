"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";

interface CommentFormProps {
  avatar?: string | null;
  onSubmit: (comment: string) => Promise<void> | void;
  loading?: boolean;
  maxLength?: number;
}

export default function SocialNewComment({
  avatar,
  onSubmit,
  loading = false,
  maxLength = 1000,
}: CommentFormProps) {
  const [text, setText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text.trim());
    setText(""); // reset textarea
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 items-start bg-white  border  rounded-2xl p-4"
    >
      {/* Avatar */}
      {avatar ? (
        <CldImage
          src={avatar}
          width={48}
          height={48}
          crop="fill"
          gravity="face"
          radius="max"
          quality="auto"
          className="object-cover rounded-full"
          alt="Your profile picture"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 " />
      )}

      {/* Input zone */}
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          maxLength={maxLength}
          className="w-full p-3 border  rounded-xl bg-gray-50  text-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
        />

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500 ">
            {text.length}/{maxLength} characters
          </span>

          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
}
