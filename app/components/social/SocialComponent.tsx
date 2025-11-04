import { get_country_comments, get_landing_comments, get_region_comments, get_takeoff_comments } from "@/app/api/get/get_comments";
import SocialView from "./SocialView";
<<<<<<< HEAD
import type { Comment } from "@/app/types"; 




type CommentsResponse = {
  userID: string | null;
  comments: Comment[];
=======

type CommentsResponse = {
  userID: string | null;
  comments: any[];
>>>>>>> 43fdcb2b923be48ad005f344ea53a63c4b5eb3c2
};

type SocialComponentProps = {
  selectedTipe: "c" | "r" | "t" | "l";
  selectedId: number;
  selectedName: string;
};

export default async function SocialComponent({ selectedTipe, selectedId, selectedName }: SocialComponentProps) {

  let rez: CommentsResponse;

  if (selectedTipe === "c") rez = await get_country_comments({ id: selectedId });
  else if (selectedTipe === "r") rez = await get_region_comments({ id: selectedId });
  else if (selectedTipe === "t") rez = await get_takeoff_comments({ id: selectedId });
  else rez = await get_landing_comments({ id: selectedId });

  const comments = rez.comments;
  const user = rez.userID;

  return (
    <SocialView 
      selectedTipe={selectedTipe} 
      selectedId={selectedId} 
      selectedName={selectedName} 
      comments={comments} 
      user={user} 
    />
  );
}
