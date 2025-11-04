import LoginClient from "./LoginClient";

interface PageProps {
  searchParams: { verified?: string };
}

export default function LoginPage({ searchParams }: PageProps) {
  const verified = searchParams.verified === "true"; // convertim la boolean
  return <LoginClient verified={verified} />;
}
