import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import ClientUserNav from "./ClientUserNav";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="flex justify-end p-4">
      <ClientUserNav session={session} />
    </header>
  );
}