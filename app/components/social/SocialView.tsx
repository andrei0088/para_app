"use client";
import { useState } from "react";
import { add_comment, get_comment_update, get_delete_comment, raport_comment } from "@/app/api/get/get_comments";

type CommentUser = {
  id: string;
  name: string;
};

type CommentItem = {
  id: number;
  comment: string;
  createdAt: string | Date;
  userId: string;
  user: CommentUser;
};

type SocialViewProps = {
  selectedTipe: "c" | "r" | "t" | "l";
  selectedId: number;
  selectedName: string;
  comments: CommentItem[];
  user: string | null;
};

export default function SocialView({
  selectedTipe,
  selectedId,
  selectedName,
  comments,
  user,
}: SocialViewProps) {

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState<CommentItem[]>([...comments]);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 7;

  // Sortează crescător după createdAt pentru a păstra poziția comentariilor
  const sortedComments = [...commentList].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const totalPages = Math.ceil(sortedComments.length / pageSize);
  const startIdx = sortedComments.length - (page + 1) * pageSize;
  const endIdx = sortedComments.length - page * pageSize;
  const visibleComments = sortedComments.slice(Math.max(0, startIdx), endIdx);

  function startEdit(c: CommentItem) {
    setEditId(c.id);
    setEditText(c.comment);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (newComment.length > 1000) {
      setMessageType("error");
      setMessage("Comment is too long. Maximum 1000 characters allowed.");
      return;
    }

    setLoading(true);
    const rez = await add_comment(selectedTipe, selectedId, newComment);

    if (rez.success) {
      setMessageType("success");
      setMessage(rez.message);
      // Adaugă comentariul nou direct în state, fără reload
      const newCommentObj: CommentItem = {
        id: Date.now(), // temporar până primești ID real
        comment: newComment,
        createdAt: new Date(),
        userId: user || "",
        user: { id: user || "", name: "You" },
      };
      setCommentList(prev => [...prev, newCommentObj]);
      setNewComment("");
    } else {
      setMessageType("error");
      setMessage(rez.message || "Failed to add comment");
    }

    setLoading(false);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editText.trim() || editId === null) return;

    if (editText.length > 1000) {
      setMessageType("error");
      setMessage("Comment is too long. Maximum 1000 characters allowed.");
      return;
    }

    const rez = await get_comment_update(editId, editText, selectedTipe);

    if (rez.success) {
      setCommentList(prev =>
        prev.map(c => (c.id === editId ? { ...c, comment: editText } : c))
      );
      setMessageType("success");
      setMessage("Comment updated successfully.");
      setEditId(null);
    } else {
      setMessageType("error");
      setMessage(rez.message || "Failed to update comment");
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const rez = await get_delete_comment(id, selectedTipe);

    if (rez.success) {
      setCommentList(prev => prev.filter(c => c.id !== id));
      setMessageType("success");
      setMessage(rez.message);
    } else {
      setMessageType("error");
      setMessage(rez.message || "Failed to delete comment");
    }
  }

  return (
    <section className="max-w-6xl mx-auto mt-12 px-8 py-6 bg-gray-50 dark:bg-[#1b1c1f] rounded-3xl shadow-md">
      <h2 className="text-3xl font-serif text-center mb-5 text-gray-900 dark:text-gray-200">
        What others say about <span className="font-semibold">{selectedName}</span>
      </h2>

      {message && (
        <p className={`mb-4 text-center ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <div className="space-y-3">
        {visibleComments.map((c) => (
          <article key={c.id} className="p-4 rounded-2xl border bg-white dark:bg-[#141417] dark:border-[#2c2d31]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                {c.userId === user ? <span className="italic text-gray-400 mr-1">You</span> : c.user.name}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  on {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </h3>
            <button
                  className="text-sm px-3 py-1 rounded-md border border-red-500 text-orange-500 hover:bg-red-200 dark:hover:bg-gray-800"
                onClick={() => raport_comment({id:c.id , tipe: selectedTipe})}>
                  !RAPORT!
              </button>
              {c.userId === user && editId !== c.id && (
                <button
                  className="text-sm px-3 py-1 rounded-md border hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => startEdit(c)}
                >
                  Edit
                </button>
              )}
            </div>

            {editId === c.id ? (
              <form onSubmit={handleUpdate} className="mt-3 space-y-2">
                <textarea
                  className="w-full p-2 border rounded-xl"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  {editText.length}/1000 characters
                </p>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
                    Save
                  </button>
                  <button type="button" className="px-4 py-2 border rounded-xl" onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                  <button type="button" className="px-4 py-2 bg-red-600 text-white rounded-xl"
                    onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">“{c.comment}”</p>
            )}
          </article>
        ))}
      </div>

      {comments.length > pageSize && (
        <div className="mt-4 flex justify-center gap-4">
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages} className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-40">↑ Older</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-40">↓ Newer</button>
        </div>
      )}

      <form className="mt-6" onSubmit={handleSubmit}>
        <textarea
          className="w-full h-28 p-4 border rounded-2xl"
          placeholder="Share your experience..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">{newComment.length}/1000 characters</p>
        <button className="mt-3 px-6 py-3 bg-blue-600 text-white rounded-xl" disabled={loading}>
          Submit
        </button>
      </form>
    </section>
  );
}
