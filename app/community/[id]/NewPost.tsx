"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  componentId: number;
  user: { id?: string; name?: string };
};

export default function NewPost({ componentId, user }: Props) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user.id || !user.name) {
    return (
      <section className="rounded-sm shadow-sm p-5 text-sm text-gray-600">
        <p className="mb-2 font-medium text-gray-900">Join the conversation</p>

        <p className="mb-4">
          You need to be logged in and a member of this community to post a
          message.
        </p>

        <Link
          href="/user/login"
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Log in to write a message
        </Link>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!content.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/community/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          componentId,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setContent("");
      location.reload();
    } catch {
      setError("Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-sm shadow-sm p-5">
      <p className="mb-2 text-sm text-gray-800">Post a message: </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a message..."
          className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none"
          rows={3}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
}
