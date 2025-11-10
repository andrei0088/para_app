import ResetPasswordClient from "./ResetPasswordClient";

interface PageProps {
  searchParams: { token?: string };
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const props = await searchParams;
  const token = props.token;

  if (!token) {
    return (
      <p className="text-center mt-10 text-red-600">No reset token provided!</p>
    );
  }

  return <ResetPasswordClient token={token} />;
}
