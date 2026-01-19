import {
  get_country_comment,
  get_landing_comment,
  get_region_comment,
  get_takeoff_comment,
} from "./mongoComment";
import SocialView from "./SocialView";
import type { Comment } from "@/app/types";
import { Suspense } from "react";

type CommentItem = {
  id: string;
  componentId: number;
  profileId: number;
  userId: string;
  userName: string;
  comment: string;
  report: number;
  reportedBy?: string[];
  deletedAt: string | Date | null;
  createdAt: string | Date;
  temp?: boolean;
};

type CommentsResponse = {
  user: {
    id?: string | null;
    name?: string | null;
    success: boolean;
    message?: string | null;
  } | null;
  comments: CommentItem[];
};

type SocialComponentProps = {
  selectedTipe: "c" | "r" | "t" | "l";
  selectedId: number;
  selectedName: string;
};

export default async function SocialComponent({
  selectedTipe,
  selectedId,
  selectedName,
}: SocialComponentProps) {
  let rez: CommentsResponse | null;

  if (selectedTipe === "c") rez = await get_country_comment({ id: selectedId });
  else if (selectedTipe === "r")
    rez = await get_region_comment({ id: selectedId });
  else if (selectedTipe === "t")
    rez = await get_takeoff_comment({ id: selectedId });
  else rez = await get_landing_comment({ id: selectedId });
  if (!rez) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SocialView
          selectedTipe={selectedTipe}
          selectedId={selectedId}
          selectedName={selectedName}
          comments={[]}
          user={null}
        />
      </Suspense>
    );
  }
  const comments = rez.comments;
  const user = rez.user;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SocialView
        selectedTipe={selectedTipe}
        selectedId={selectedId}
        selectedName={selectedName}
        comments={comments}
        user={user}
      />
    </Suspense>
  );
}
