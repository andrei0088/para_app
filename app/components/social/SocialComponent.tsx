import {
  get_country_comments,
  get_landing_comments,
  get_region_comments,
  get_takeoff_comments,
} from "@/app/api/get/get_comments";
import SocialView from "./SocialView";
import type { Comment } from "@/app/types";
import { get_profiles } from "./action";

type Profile = {
  id: number;
  url: string;
};

type CommentWithProfile = Comment & { profileId: number };

type CommentsResponse = {
  userID: string | null;
  comments: CommentWithProfile[];
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
  let rez: CommentsResponse;

  if (selectedTipe === "c")
    rez = (await get_country_comments({ id: selectedId })) ?? {
      userID: null,
      comments: [],
    };
  else if (selectedTipe === "r")
    rez = (await get_region_comments({ id: selectedId })) ?? {
      userID: null,
      comments: [],
    };
  else if (selectedTipe === "t")
    rez = (await get_takeoff_comments({ id: selectedId })) ?? {
      userID: null,
      comments: [],
    };
  else
    rez = (await get_landing_comments({ id: selectedId })) ?? {
      userID: null,
      comments: [],
    };

  // Extrage profileId-uri unice
  const list: number[] = Array.from(
    new Set(rez.comments.map((item) => item.profileId))
  );

  // Preia profilele
  const profiles: Profile[] = await get_profiles(list);

  return (
    <SocialView
      selectedTipe={selectedTipe}
      selectedId={selectedId}
      selectedName={selectedName}
      comments={rez.comments}
      user={rez.userID}
      profiles={profiles}
    />
  );
}
