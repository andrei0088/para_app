import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ClientUserNav from "./ClientUserNav";
import ClientUserDesktop from "./ClientUserDesktop";

export default async function UserNav({
  wstyle,
}: {
  wstyle: "mobile" | "desktop";
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (wstyle === "mobile") return <ClientUserNav session={session} />;
  else return <ClientUserDesktop session={session} />;
}
