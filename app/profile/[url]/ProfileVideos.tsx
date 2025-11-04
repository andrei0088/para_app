"use client";

import React from "react";

interface ProfileVideosProps {
  videos: string[];
}

export default function ProfileVideos({ videos }: ProfileVideosProps) {
  if (!videos || videos.length === 0) return null;

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {videos.map((url, idx) => {
    const embedUrl = getEmbedUrl(url);
    if (!embedUrl) return null;

    return (
      <div
        key={idx}
        className="w-full rounded-lg overflow-hidden shadow-md border border-gray-200 aspect-video"
      >
        <iframe
          src={embedUrl}
          title={`video-${idx}`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  })}
</div>

    </div>
  );
}
