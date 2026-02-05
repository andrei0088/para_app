import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ClientUserNav from "./ClientUserNav";
import ClientUserDesktop from "./ClientUserDesktop";
import { get_url, is_admin } from "./action";

type Admin = {
  isAdmin: boolean;
  notifications: number;
};

export default async function UserNav({
  wstyle,
}: {
  wstyle: "mobile" | "desktop";
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  let rez: Admin | undefined = undefined;
  let url: string | null = null;
  if (session) {
    rez = await is_admin(session.user.id);
    url = await get_url(session.user.id);
  }

  if (wstyle === "mobile")
    return (
      <ClientUserNav session={session} url={url ?? undefined} admin={rez} />
    );
  else
    return (
      <ClientUserDesktop session={session} url={url ?? undefined} admin={rez} />
    );
}
