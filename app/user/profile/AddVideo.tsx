"use client";
import React, { useState } from "react";
import { add_video } from "./get_profile";

interface AddVideoProps {
  profileId: number;
}

const AddVideo: React.FC<AddVideoProps> = ({ profileId }) => {
  const [videoInput, setVideoInput] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!videoInput.trim()) return;

    const res = await add_video(videoInput, profileId, name);

    if (res.success) {
      setMessage({ text: "✅ Video added successfully!", type: "success" });
      setVideoInput("");
      setName("");
      // Opțional: aici poți actualiza lista de videos în state dacă vrei să fie instant
    } else {
      setMessage({ text: `❌ ${res.message}`, type: "error" });
    }
  };

  return (
    <div className="w-full my-5">
      <form onSubmit={submitForm} className="flex flex-col gap-2">
        {/* Primul rând */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <label htmlFor="url" className="whitespace-nowrap md:w-auto">
            Add YouTube URL:
          </label>
          <input
            type="text"
            name="url"
            value={videoInput}
            onChange={(e) => setVideoInput(e.target.value)}
            className="flex-1 min-w-[200px] border px-2 py-1 rounded w-full md:w-auto"
          />
        </div>

        {/* Al doilea rând */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <label htmlFor="name" className="whitespace-nowrap md:w-auto">
            Add video name:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 min-w-[150px] border px-2 py-1 rounded w-full md:w-auto"
          />
        </div>

        {/* Buton */}
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition mt-2"
        >
          Add
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AddVideo;
