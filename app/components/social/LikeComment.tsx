"use client";

import { useEffect, useState } from "react";
import { get_like_comment } from "./action";
import LikeCommentClient from "./LikeCommentClient";
type CommentCharType = "c" | "r" | "t" | "l";

type LikeCommentProps = {
  commentId: number;
  type: CommentCharType;
};

export default function LikeComment({ commentId, type }: LikeCommentProps) {
  const [like, setLike] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [logd, setLogd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLikes() {
      try {
        const rez = await get_like_comment({ commentId, type });
        console.log({ rez });

        if (rez.success) {
          setLike(rez.data ?? 0);
          setUserLiked(rez.userLiked ?? false);
          setLogd(rez.logd ?? false);
        } else {
          setError(rez.message || "Failed to load likes");
        }
      } catch (err) {
        setError("Failed to fetch data:" + err);
      }
    }
    fetchLikes();
  }, [commentId, type]);

  if (error) return <div>{error}</div>;
  return (
    <LikeCommentClient
      like={like}
      userLiked={userLiked}
      logd={logd}
      commentId={commentId}
      type={type}
    />
  );
}
