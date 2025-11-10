import VerifyEmailClient from "./VerifyEmailClient";

interface PageProps {
  searchParams: { email?: string };
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const param = await searchParams;
  const email = param.email;

  // Dacă nu există email, redirecționăm pe server
  if (!email) {
    return (
      <p className="text-red-600 text-center mt-10">Email not provided!</p>
    );
  }

  return <VerifyEmailClient email={email} />;
}
