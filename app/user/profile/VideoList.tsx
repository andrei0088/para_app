"use client";

import { delete_video, edit_video_name } from "./get_profile";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Video = {
  id: number;
  profileId: number;
  userId: string;
  url: string;
  name: string;
};

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");

  async function handleEditClick(video: Video) {
    setEditingId(video.id);
    setNewName(video.name);
  }

  async function handleCancel() {
    setEditingId(null);
    setNewName("");
  }

  async function handleChange(video: Video) {
    if (!newName.trim()) {
      setMessage("❌ Name cannot be empty.");
      return;
    }

    const rez = await edit_video_name(video.id, video.profileId, newName);

    if (rez.success) {
      setMessage("✅ Name updated.");
      setEditingId(null);
      setNewName("");
      router.refresh(); // reîncarcă datele pe pagină
    } else {
      setMessage(`❌ ${rez.message}`);
    }
  }

  async function handleDelete(id: number, profileId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video? This action cannot be undone."
    );

    if (!confirmDelete) return; // dacă userul apasă Cancel, nu facem nimic

    const rez = await delete_video(id, profileId);

    if (rez.success) {
      setMessage("✅ Video deleted.");
      router.refresh();
    } else {
      setMessage(`❌ ${rez.message}`);
    }
  }

  return (
    <div className="my-5 space-y-2">
      {message && <p className="text-center text-sm text-red-600">{message}</p>}

      {videos.map((v) => (
        <div
          key={v.id}
          className="flex items-center justify-between border border-gray-500 p-2 "
        >
          <div className="flex items-center gap-2 flex-1">
            {editingId === v.id ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="flex-1 border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleChange(v)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Change
                </button>
                <button
                  onClick={handleCancel}
                  className="px-2 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  className="text-gray-600 cursor-pointer text-xl font-bold px-2"
                  onClick={() => handleEditClick(v)}
                >
                  Edit
                </span>
                <span>{v.name}</span>
              </>
            )}
          </div>

          <span
            className="text-red-600 cursor-pointer text-xl font-bold px-2"
            onClick={() => handleDelete(v.id, v.profileId)}
          >
            x
          </span>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
