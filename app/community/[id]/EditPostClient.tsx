"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  initialMessage: string;
};

export default function EditPostClient({ postId, initialMessage }: Props) {
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/community/edit_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, message }),
      });

      const data = await res.json();

      if (res.ok) {
        router.refresh();
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className="w-full border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-teal-600 text-white rounded-sm hover:bg-teal-700 transition-all"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
