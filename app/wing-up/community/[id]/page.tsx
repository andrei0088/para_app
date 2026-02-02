import Link from "next/link";
import { redirect } from "next/navigation";

export default async function community({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { success, community } = await fetch(
    `${process.env.BETTER_AUTH_URL}/api/wing-up/get-community/${id}`,
    { cache: "no-store" },
  ).then((res) => res.json());
  if (!success) {
    return (
      <div className="w-full p-6">
        <h1 className="text-2xl font-semibold mb-3">
          This community has not been created yet
        </h1>

        <p className="text-sm  mb-4">
          You are looking for the {community.region?.name}
          {community.region?.name ? " - " : ""}
          {community.country?.name} community.
        </p>

        <p className="text-sm  mb-3 leading-relaxed">
          This community does not exist yet, but you can create it in just a few
          clicks. Be the first to start a local community for this area and help
          connect people who share the same interests.
        </p>

        <p className="text-sm  mb-6 leading-relaxed">
          By creating this community, you can add useful information, invite
          members, share updates, and build a strong local network.
        </p>
        <p className="text-sm mb-6 leading-relaxed">
          {community.region?.name && !community.countryCommunity && (
            <>
              To create the <strong>{community.region.name}</strong> community,
              a community for <strong>{community.country?.name}</strong> must
              exist first.
              <br />
              <br />
              Country communities act as a main hub and are required before
              regional communities can be created.
            </>
          )}
        </p>

        <Link href={`/wing-up/create-community/${id}`}>
          <p className="w-full bg-cyan-800 text-white text-center py-3 rounded-sm text-sm font-semibold hover:bg-cyan-900 transition mt-5 disabled:text-red-100 disabled:hover:bg-cyan-800">
            {" "}
            Create Community
          </p>
        </Link>
      </div>
    );
  }
  redirect(`/community/${id}`);
}
