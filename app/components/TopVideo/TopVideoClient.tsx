import Link from "next/link";
import VideoLike from "./VideoLike";
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
      <section aria-labelledby="top-videos-heading" className="mt-6">
        <h2
          id="top-videos-heading"
          className="text-2xl font-bold text-gray-900 flex gap-2"
        >
          Top Paragliding Videos
        </h2>
        <p className="mt-2 text-gray-600">
          Discover the most liked paragliding videos shared by the Para APP
          community, showcasing breathtaking flights and top tips for pilots.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-2">
        {topVideos.map((v) => {
          const videoId = extractYouTubeId(v.video?.url);
          return (
            <div
              key={v.video?.id}
              className="p-2 bg-white rounded-sm shadow-sm w-full"
            >
              <div className="">
                {/* Primul rând: place și link profil */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-semibold text-blue-900">
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
                <div className="font-medium first-letter:uppercase">
                  {v.video?.title ?? "Untitled"}
                </div>
              </div>

              {videoId ? (
                <div className="aspect-video w-full overflow-hidden rounded-sm mb-2">
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
    </div>
  );
}
