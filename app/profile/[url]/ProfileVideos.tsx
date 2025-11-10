import VideoLike from "./VideoLike";

interface Video {
  id: number;
  name: string;
  url: string;
}

interface ProfileVideosProps {
  videos?: Video[];
}

const ProfileVideos: React.FC<ProfileVideosProps> = ({ videos = [] }) => {
  const getYouTubeId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="flex flex-wrap mx-2 mt-2">
      {videos.length === 0 && (
        <div className="w-full text-center py-10 flex flex-col items-center justify-center opacity-80 animate-fadeIn">
          <div className="text-4xl mb-3">🎬</div>
          <p className="text-sm text-gray-500">No videos yet.</p>
        </div>
      )}
      {videos.map((v) => {
        const videoId = getYouTubeId(v.url);
        if (!videoId)
          return (
            <p key={v.id} className="w-full">
              Invalid YouTube URL
            </p>
          );

        return (
          <div key={v.id} className="w-full sm:w-1/2 px-2 mb-4">
            <h2 className="mb-2 font-semibold text-3xl my-2">{v.name}</h2>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={v.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <VideoLike videoId={v.id} />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileVideos;
