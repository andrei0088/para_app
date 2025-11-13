// RandomVideoServer.tsx
import Link from "next/link";
import VideoLike from "./VideoLike"; // Server Component
import type { Video } from "./action";

interface RandomVideoProps {
  videos: Video[];
}

export default function RandomVideoServer({ videos }: RandomVideoProps) {
  const extractYouTubeId = (url?: string) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!videos || videos.length === 0) {
    return <p className="text-gray-500 italic">No random videos available</p>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">You mai like</h2>

      {videos.map((video) => {
        const videoId = extractYouTubeId(video.url);
        return (
          <div
            key={video.id}
            className="p-4 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="w-full">
              {/* Primul rând: link profil */}
              <div className="flex justify-end">
                {video?.public ? (
                  <Link
                    href={`/profile/${video?.profileUrl}`}
                    className="font-medium"
                  >
                    {video?.profileName ?? "Unknown"}
                  </Link>
                ) : (
                  <span>{video?.profileName ?? "Unknown"}</span>
                )}
              </div>

              {/* Al doilea rând: titlu video */}
              <div className="font-medium [&::first-letter]:uppercase">
                {video.title ?? "Untitled"}
              </div>
            </div>

            {videoId ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl mb-2">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.title || "YouTube video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Invalid or missing YouTube link
              </p>
            )}

            {/* Server Component VideoLike */}
            <VideoLike videoId={video.id} />
          </div>
        );
      })}
    </div>
  );
}
