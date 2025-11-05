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

interface UrlItem {
  url: string;
}

export default function ProfileFormsClient({ initialData }: ProfileFormsProps) {
  // URL
  const [urlState, setUrlState] = useState(initialData.url);
  const [urlMessage, setUrlMessage] = useState("");
  const [urlSuggestion, setUrlSuggestion] = useState("");
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  const [viewLink, setViewLink] = useState<boolean>(initialData.public);

  // Profile fields
  const [formState, setFormState] = useState({
    public: initialData.public ? "yes" : "no",
    sex: initialData.sex,
    bio: initialData.bio ?? "",
  });
  const [formMessage, setFormMessage] = useState("");

  // Videos
  const [videoInput, setVideoInput] = useState("");
  const [videos, setVideos] = useState<string[]>(initialData.videos ?? []);
  const [videoError, setVideoError] = useState("");

  // Preluăm toate URL-urile existente
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urls = await get_all_url();
        if (urls.success && urls.data) {
          setExistingUrls(urls.data.map((u: UrlItem) => u.url.toLowerCase()));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUrls();
  }, []);

  // Regex flexibil pentru YouTube (acceptă parametri extra)
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&][\w=&-]*)?$/;

  // URL input
  const handleUrlChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlState(value);

    const valLower = value.toLowerCase();
    if (existingUrls.includes(valLower)) {
      let suggestion: string;
      do {
        const rand = Math.floor(Math.random() * 900) + 100;
        suggestion = `${value}${rand}`;
      } while (existingUrls.includes(suggestion.toLowerCase()));
      setUrlSuggestion(suggestion);
    } else {
      setUrlSuggestion("");
    }
  };

  const handleUrlChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("url", urlState);

    const res = await change_url(formData);
    if (res.success) setUrlMessage("URL updated successfully!");
    else setUrlMessage("Error: " + res.message);
  };

  // Add video
  const addVideo = () => {
    const trimmed = videoInput.trim();
    if (!trimmed) return;

    if (!youtubeRegex.test(trimmed)) {
      setVideoError("Please enter a valid YouTube link!");
      return;
    }

    setVideos((prev) => [...prev, trimmed]);
    setVideoInput("");
    setVideoError("");
  };

  // Remove video
  const removeVideo = (idx: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit profile
  const handleProfileChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validare video
    const invalid = videos.some((v) => !youtubeRegex.test(v));
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
      setViewLink(res.data.public); // actualizează view link
    } else {
      setFormMessage("Error: " + res.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 sm:p-8 md:p-12 mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>

          {viewLink ? (
            <Link href={`/profile/${urlState}`} className="text-green-600 hover:text-green-700 font-medium underline">
              View Profile
            </Link>
          ) : (
            <span className="text-gray-500 text-sm italic">Make your profile public to view it.</span>
          )}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="space-y-6">
            {/* Public */}
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Public Profile</label>
              <select
                name="public"
                value={formState.public}
                onChange={(e) => setFormState((p) => ({ ...p, public: e.target.value }))}
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
              >
                <option value="yes">Yes (visible to everyone)</option>
                <option value="no">No (no one can see)</option>
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Sex</label>
              <div className="flex gap-6 text-gray-800 dark:text-gray-300">
                {["m", "f", ""].map((val) => (
                  <label key={val} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sex"
                      value={val}
                      checked={formState.sex === val}
                      onChange={(e) => setFormState((p) => ({ ...p, sex: e.target.value as "m" | "f" | "" }))}
                    />
                    {val === "m" ? "Male" : val === "f" ? "Female" : "Prefer not to say"}
                  </label>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Bio</label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState((p) => ({ ...p, bio: e.target.value }))}
                rows={6}
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Profile URL */}
            <form onSubmit={handleUrlChange} className="space-y-2">
              <label className="block font-semibold text-gray-800 dark:text-gray-200">Profile URL</label>
              <input
                type="text"
                value={urlState}
                onChange={handleUrlChangeInput}
                className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
              />
              {urlSuggestion && <p className="text-sm text-gray-500">Try: <strong>{urlSuggestion}</strong></p>}
              <button type="submit" className="text-sm text-green-600 hover:text-green-700 underline">
                Save URL
              </button>
              {urlMessage && <p className="text-sm text-gray-600">{urlMessage}</p>}
            </form>

            {/* Videos */}
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">Videos</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="YouTube link"
                  className="flex-1 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={addVideo}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              {videoError && <p className="text-red-600 text-sm mt-1">{videoError}</p>}
              <ul className="mt-2 space-y-1">
                {videos.map((vid, idx) => (
                  <li key={idx} className="flex justify-between items-center border rounded px-2 py-1 bg-white dark:bg-gray-700">
                    <span className="truncate">{vid}</span>
                    <button onClick={() => removeVideo(idx)} className="text-red-600 font-bold">×</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Save Profile */}
        <form onSubmit={handleProfileChange} className="pt-8 border-t border-gray-300 dark:border-gray-700">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Save Profile
          </button>
          {formMessage && <p className="text-center text-sm mt-2 text-gray-600">{formMessage}</p>}
        </form>
      </div>
    </div>
  );
}
