import { prisma } from "@/lib/prisma";

export interface Video {
  id: number;
  title: string;
  url: string;
  userId: string;
  createdAt: Date;
  profileId: number;
  reported: number;
  deleted: Date | null;
  profileName?: string | null;
  profileUrl?: string | null;
  public: boolean;
}

export interface TopVideo {
  place: number;
  video?: Video;
  likes: number;
  name: string; // obligatoriu
}

/**
 * Returnează top 3 video-uri după like-uri
 */
export async function getTopVideos(): Promise<TopVideo[]> {
  // 1️⃣ Preluăm doar video-urile valide (nu șterse și nu raportate)
  const validVideos = await prisma.video.findMany({
    where: {
      deleted: null,
      reported: 0,
    },
    select: {
      id: true,
    },
  });

  const validIds = validVideos.map((v) => v.id);

  if (validIds.length === 0) return [];

  // 2️⃣ Preluăm cele mai like-uite video-uri valide
  const topVideos = await prisma.videoLike.groupBy({
    by: ["videoId"],
    _count: { videoId: true },
    where: { videoId: { in: validIds } },
    orderBy: { _count: { videoId: "desc" } },
    take: 6,
  });

  const videoIds = topVideos.map((v) => v.videoId);
  if (videoIds.length === 0) return [];

  // 3️⃣ Preluăm datele video și profile-ul asociat
  const videosFromDb = await prisma.video.findMany({
    where: { id: { in: videoIds } },
    include: {
      profile: {
        select: {
          name: true,
          url: true,
          public: true,
        },
      },
    },
  });

  // 4️⃣ Construim array-ul final cu top 3
  return topVideos
    .map((v, index) => {
      const videoDb = videosFromDb.find((vid) => vid.id === v.videoId);
      if (!videoDb) return null;

      return {
        place: index + 1,
        likes: v._count.videoId,
        video: {
          id: videoDb.id,
          title: videoDb.name,
          url: videoDb.url,
          userId: videoDb.userId,
          createdAt: videoDb.createdAt,
          profileId: videoDb.profileId,
          reported: videoDb.reported,
          deleted: videoDb.deleted,
          profileName: videoDb.profile?.name ?? null,
          profileUrl: videoDb.profile?.url ?? null,
          public: videoDb.profile?.public ?? false,
        },
        name: videoDb.name ?? "Untitled",
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);
}

/**
 * Returnează un număr random de videoclipuri valide din tabelul `video`
 * @param count Numărul de videoclipuri random (default 3)
 */
export async function getRandomVideos(count: number = 3): Promise<Video[]> {
  const allVideosRaw = await prisma.video.findMany({
    where: {
      deleted: null,
      reported: 0,
    },
    include: {
      profile: {
        select: {
          name: true,
          url: true,
          public: true,
        },
      },
    },
  });

  const allVideos: Video[] = allVideosRaw.map((v) => ({
    id: v.id,
    title: v.name,
    url: v.url,
    userId: v.userId,
    createdAt: v.createdAt,
    profileId: v.profileId,
    reported: v.reported,
    deleted: v.deleted,
    profileName: v.profile?.name ?? null,
    profileUrl: v.profile?.url ?? null,
    public: v.profile?.public ?? false,
  }));

  // Shuffle array (Fisher–Yates)
  for (let i = allVideos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allVideos[i], allVideos[j]] = [allVideos[j], allVideos[i]];
  }

  // Returnăm primele `count` videoclipuri
  return allVideos.slice(0, count);
}
