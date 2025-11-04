import { signOutAction_after_delete } from "@/app/api/actions/auth";

export default async function page()
{
    await signOutAction_after_delete();
    return true;
}