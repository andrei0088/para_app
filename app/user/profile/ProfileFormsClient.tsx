"use client";

import React, { useState, useEffect } from "react";
import { change_url, change_profile, get_all_url } from "./get_profile";
import Link from "next/link";

interface ProfileFormsProps {
  initialData: {
    name: string;
    url: string;
    public: boolean;
    sex: "m" | "f" | "";
    bio: string | null;
    videos?: string[];
  };
}

export default function ProfileFormsClient({ initialData }: ProfileFormsProps) {
  // URL
  const [urlState, setUrlState] = useState(initialData.url);
  const [urlMessage, setUrlMessage] = useState("");
  const [urlSuggestion, setUrlSuggestion] = useState("");
  const [existingUrls, setExistingUrls] = useState<string[]>([]);

  // Profile fields
  const [formState, setFormState] = useState({
    public: initialData.public ? "yes" : "no",
    sex: initialData.sex || "",
    bio: initialData.bio || "",
  });
  const [formMessage, setFormMessage] = useState("");

  // Videos
  const [videoInput, setVideoInput] = useState("");
  const [videos, setVideos] = useState<string[]>(initialData.videos || []);
  const [videoError, setVideoError] = useState("");

  // Preluăm toate URL-urile existente
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await get_all_url();
        if (urls.success && urls.data) {
          setExistingUrls(urls.data.map((u: any) => u.url.toLowerCase()));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUrls();
  }, []);

  // URL input
  const handleUrlChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlState(value);

    const valLower = value.toLowerCase();
    if (existingUrls.includes(valLower)) {
      let suggestion;
      do {
        const rand = Math.floor(Math.random() * 900) + 100;
        suggestion = `${value}${rand}`;
      } while (existingUrls.includes(suggestion.toLowerCase()));
      setUrlSuggestion(suggestion);
    } else {
      setUrlSuggestion("");
    }
  };

  const handleUrlChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("url", urlState);

    const res = await change_url(formData);
    if (res.success) setUrlMessage("URL updated successfully!");
    else setUrlMessage("Error: " + res.message);
  };

  // Add / Remove video
  const addVideo = () => {
    const trimmed = videoInput.trim();
    if (trimmed === "") return;

    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    if (!youtubeRegex.test(trimmed)) {
      setVideoError("Please enter a valid YouTube link!");
      return;
    }

    setVideos((prev) => [...prev, trimmed]);
    setVideoInput("");
    setVideoError("");
  };

  const removeVideo = (idx: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit profile
  const handleProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const invalid = videos.some(
      (v) =>
        !/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/.test(
          v
        )
    );

    if (invalid) {
      setVideoError("You have invalid YouTube links. Fix them before saving.");
      return;
    }

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) =>
      formData.append(key, value)
    );
    videos.forEach((v) => formData.append("videos[]", v));

    const res = await change_profile(formData);
    if (res.success) {
      setFormMessage("Profile updated successfully!");
      setVideoError("");
    } else {
      setFormMessage("Error: " + res.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">{initialData.name}</h2>
      <Link href={`/profile/${initialData.url}`} className="text-blue-500 hover:underline">
        View your profile
      </Link>

      {/* URL Form */}
      <form onSubmit={handleUrlChange} className="space-y-2">
        <label className="font-semibold">Profile URL:</label>
        <input
          type="text"
          value={urlState}
          onChange={handleUrlChangeInput}
          className="w-full border px-3 py-2 rounded"
        />
        {urlSuggestion && (
          <p className="text-sm text-gray-600">
            URL taken! Try: <strong>{urlSuggestion}</strong>
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Change URL
        </button>
        {urlMessage && <p className="text-sm mt-1">{urlMessage}</p>}
      </form>

      {/* Profile Form */}
      <form onSubmit={handleProfileChange} className="space-y-4">
        {/* Public */}
        <div>
          <label className="font-semibold">Public Profile:</label>
          <select
            name="public"
            value={formState.public}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, public: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Sex */}
        <div>
          <label className="font-semibold">Sex:</label>
          <div className="flex gap-4 mt-1">
            {["m", "f", ""].map((val) => (
              <label key={val} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sex"
                  value={val}
                  checked={formState.sex === val}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, sex: e.target.value as "m" | "f" | "" }))
                  }
                />
                {val === "m" ? "Male" : val === "f" ? "Female" : "Prefer not to say"}
              </label>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="font-semibold">Bio:</label>
          <textarea
            name="bio"
            value={formState.bio || ""}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, bio: e.target.value }))
            }
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Videos */}
        <div>
          <label className="font-semibold">Videos (YouTube links):</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              placeholder="Paste YouTube link"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={addVideo}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {videoError && <p className="text-sm text-red-500 mt-1">{videoError}</p>}
          <ul className="mt-2 space-y-1">
            {videos.map((vid, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border rounded px-2 py-1"
              >
                <span className="truncate">{vid}</span>
                <button
                  type="button"
                  onClick={() => removeVideo(idx)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Profile
        </button>
        {formMessage && <p className="text-sm mt-1">{formMessage}</p>}
      </form>
    </div>
  );
}
