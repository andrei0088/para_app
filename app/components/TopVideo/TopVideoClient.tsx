// TopVideoServer.tsx (Server Component)
import Link from "next/link";
import VideoLike from "./VideoLike"; // Server Component
import type { TopVideo } from "./action";

interface Props {
  topVideos: TopVideo[];
}

export default function TopVideoServer({ topVideos }: Props) {
  const extractYouTubeId = (url?: string) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-2 dark:text-gray-800">
      <div></div>
      <h2 className="text-xl font-bold text-gray-800"> Top Videos</h2>
      {topVideos.map((v) => {
        const videoId = extractYouTubeId(v.video?.url);
        return (
          <div
            key={v.video?.id}
            className="p-1 bg-white rounded-2xl shadow-md border border-gray-100"
          >
            <div className="w-full">
              {/* Primul rând: place și link profil */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-semibold text-green-700">
                  #{v.place}
                </span>
                {v.video?.public ? (
                  <Link
                    href={`/profile/${v.video?.profileUrl}`}
                    className="font-medium"
                  >
                    {v.video?.profileName ?? "Unknown"}
                  </Link>
                ) : (
                  <span>{v.video?.profileName ?? "Unknown"}</span>
                )}
              </div>

              {/* Al doilea rând: titlu video */}
              <div className="font-medium [&::first-letter]:uppercase">
                {v.video?.title ?? "Untitled"}
              </div>
            </div>

            {videoId ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl mb-2">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={v.video?.title || "YouTube video"}
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
            {v.video?.id && <VideoLike videoId={v.video.id} />}
          </div>
        );
      })}
    </div>
  );
}
