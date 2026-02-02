"use client";

import Image from "next/image";
import top_img from "@/public/icons/top.png";
import Link from "next/link";
import { useEffect, useState } from "react";

type TopProps = {
  id: string;
};

type LikesResponse = {
  likes: number;
  userLogged: boolean;
  userLike: boolean;
};

export default function Top({ id }: TopProps) {
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  // Preia datele inițiale de la server
  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch(`/api/community/get_likes?postId=${id}`);
        const data: LikesResponse = await res.json();

        setLikes(data.likes);
        setUserLiked(data.userLike);
        setUserLogged(data.userLogged);
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    }

    fetchLikes();
  }, [id]);

  // Handle like/unlike
  const handleLike = async () => {
    if (!userLogged) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/community/toggle_like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: id }),
      });
      const data: LikesResponse = await res.json();

      setLikes(data.likes);
      setUserLiked(data.userLike);
    } catch (error) {
      console.error("Failed to toggle like", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 ml-auto w-full justify-center py-1 h-auto dark:text-gray-900">
      {userLogged ? (
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center gap-1 py-1 px-2 rounded-sm cursor-pointer
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md text-xs md:text-sm
                     ${
                       userLiked
                         ? "bg-teal-50 border-teal-100 hover:bg-teal-100 hover:text-teal-900 hover:border-teal-100"
                         : "border-gray-900 hover:bg-teal-50 hover:border-teal-800 hover:text-teal-900"
                     }
                     ${loading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <span className={`font-semibold ${userLiked ? "text-teal-600" : ""}`}>
            {userLiked ? "I gave a" : "I give a"}
          </span>
          <Image
            src={top_img}
            alt="top"
            className="w-4 h-4 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </button>
      ) : (
        <Link
          href={`/user/login`}
          className="flex items-center gap-1 py-1 px-2 border-2 border-gray-900 rounded-sm cursor-pointer
                     hover:bg-teal-100 hover:border-teal-700 hover:text-teal-900
                     transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md animate-[pulse_2.5s_ease-in-out_infinite] hover:animate-none text-xs md:text-sm"
        >
          Join to drop a
          <Image
            src={top_img}
            alt="top"
            className="w-3 h-3 md:w-5 md:h-5 object-cover animate-[bounce_3s_infinite]"
          />
        </Link>
      )}

      <div className="flex items-center gap-1 py-1 px-2 bg-gray-100 rounded-sm shadow-sm text-xs md:text-sm">
        <p className="text-gray-700 font-medium">{likes} likes</p>
        <Image
          src={top_img}
          alt="top"
          className="w-4 h-4 md:w-5 md:h-5 object-cover"
        />
      </div>
    </div>
  );
}
