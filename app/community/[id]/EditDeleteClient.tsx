"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditPostModal from "./EditPostModal";

type Props = {
  postId: string;
  initialMessage: string;
};

export default function EditDeleteClient({ postId, initialMessage }: Props) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleEdit = () => setModalOpen(true);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/community/delete_post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if (res.ok) router.refresh();
      else {
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
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleEdit}
          disabled={loading}
          className="px-3 py-1.5 text-sm font-medium text-slate-700 border border-slate-300 rounded-sm hover:bg-slate-100 transition-all duration-200 active:scale-95"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-sm font-medium text-rose-600 border border-rose-300 rounded-sm hover:bg-rose-50 transition-all duration-200 active:scale-95"
        >
          Delete
        </button>
      </div>

      {/* Modal */}
      <EditPostModal
        postId={postId}
        initialMessage={initialMessage}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
