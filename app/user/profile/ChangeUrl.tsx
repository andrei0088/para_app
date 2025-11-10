"use client";

import React, { useState } from "react";
import { check_url, change_url } from "./get_profile";

const ChangeUrlClient: React.FC<{ initialUrl: string }> = ({ initialUrl }) => {
  const [url, setUrl] = useState(initialUrl.toLocaleLowerCase());
  const [status, setStatus] = useState<"idle" | "available" | "taken">("idle");
  const [suggestion, setSuggestion] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLocaleLowerCase(); // lowercase
    setUrl(value);
    setStatus("idle");
    setSuggestion("");
    setMsg("");

    if (!value) return;

    const res = await check_url(value);
    if (res.taken) {
      setStatus("taken");
      const randomNum = Math.floor(Math.random() * 1000);
      setSuggestion(`${value}${randomNum}`);
    } else {
      setStatus("available");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (status !== "available") {
      setMsg("❌ Cannot update. URL is taken.");
      return;
    }

    const formData = new FormData();
    formData.append("url", url);

    const res = await change_url(formData);

    if (res.success) {
      setMsg("✅ URL updated successfully!");
    } else {
      setMsg(`❌ ${res.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 my-2 max-w-full"
    >
      <label className="font-medium">Profile URL:</label>
      <input
        type="text"
        value={url}
        onChange={handleChange}
        className={`flex-1 px-3 py-2 border rounded ${
          status === "available"
            ? "border-green-500"
            : status === "taken"
            ? "border-red-500"
            : "border-gray-300"
        }`}
      />
      {status === "available" && (
        <span className="text-green-600">✅ Available!</span>
      )}
      {status === "taken" && (
        <span className="text-red-600">
          ❌ Taken! Try <strong>{suggestion}</strong>
        </span>
      )}
      {msg && <span className="text-gray-700">{msg}</span>}
      <button
        type="submit"
        className="px-4 py-2 border border-gray-300  rounded-md font-medium text-gray-900  hover:bg-gray-100  transition"
      >
        Update
      </button>
    </form>
  );
};

export default ChangeUrlClient;
