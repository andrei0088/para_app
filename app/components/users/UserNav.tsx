import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import ClientUserNav from "./ClientUserNav";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex justify-end p-5 bg-gray-50  shadow-sm h-full">
      <ClientUserNav session={session} />
    </div>
  );
}
