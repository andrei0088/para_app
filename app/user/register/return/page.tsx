import ReturnUser from "./RetrurnUser";
import { redirect } from "next/navigation";

interface PageReturnProps {
  searchParams: { name?: string };
}

export default function PageReturn({ searchParams }: PageReturnProps) {
  const name = searchParams.name ?? "Guest";

  if (!name.trim()) {
    redirect("/"); // redirect server-side
  }

  return <ReturnUser name={name} />;
}
