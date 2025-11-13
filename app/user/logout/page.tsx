import { signOutAction } from "@/app/api/actions/auth";
import { redirect } from "next/navigation"; // corect

const Page = async () => {
  await signOutAction();
  redirect("/"); // nu return, doar redirect
};

export default Page;
