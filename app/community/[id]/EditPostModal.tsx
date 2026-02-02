"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  initialMessage: string;
  open: boolean;
  onClose: () => void;
};

export default function EditPostModal({
  postId,
  initialMessage,
  open,
  onClose,
}: Props) {
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null; // modal ascuns dacă nu e open

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
      if (res.ok) {
        router.refresh();
        onClose();
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background alb semi-transparent + blur */}
      <div
        className="absolute inset-0 bg-white/40 backdrop-blur-md"
        onClick={onClose} // click pe fundal închide modal
      />
      {/* Card modal */}
      <div className="relative bg-white rounded-sm shadow-2xl p-6 w-[500px] max-w-full z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full border rounded-sm p-2 "
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-sm hover:bg-gray-300 transition-all"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-cyan-600 text-white rounded-sm hover:bg-cyan-700 transition-all"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
