import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DetailsCommunity from "./DetailsComunity";
import CountryCommunity from "./CountryCommunity";
import LocalUsers from "./LocalUsers";
import ActionButton from "./ActionButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NewPost from "./NewPost";
import OldPosts from "./OldPosts";

type Props = {
  params: {
    id: string;
  };
};

export default async function CommunityPage({ params }: Props) {
  const { id } = await params;

  // 1. Community
  const community = await prisma.community.findUnique({
    where: { url: id },
  });

  if (!community) notFound();

  // 2. Creator
  const creator = await prisma.user.findUnique({
    where: { id: community.users[0] },
    select: { name: true },
  });

  // 3. Country regions (default empty)
  let communityList: { id: number; name: string; url: string }[] = [];

  if (community.type === "Country" && community.regions.length > 0) {
    communityList = await prisma.community.findMany({
      where: {
        id: { in: community.regions },
      },
      select: {
        id: true,
        name: true,
        url: true,
      },
    });
  }

  if (community.type === "Region" && community.countryId) {
    const country = await prisma.community.findUnique({
      where: { url: community.countryId },
      select: { regions: true },
    });

    if (!country?.regions || country.regions.length === 0) {
      communityList = [];
    } else {
      communityList = await prisma.community.findMany({
        where: {
          id: { in: country.regions },
        },
        select: {
          id: true,
          name: true,
          url: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    }
  }
  const userList = community.locals;
  const users = await prisma.profile.findMany({
    where: { userId: { in: userList } },
    select: { name: true, url: true, public: true, userId: true },
  });

  const session = await auth.api.getSession({ headers: await headers() });
  let joined = false;
  if (session?.user) joined = community.users.includes(session?.user.id);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-sm shadow-sm ">
          <DetailsCommunity
            name={community.name}
            createdBy={creator?.name ?? "unknown"}
            validated={community.validated}
            countryName={community.countryName}
            countryId={community.countryId}
            users={community.users.length}
          />
          <ActionButton
            joined={joined}
            type={community.type}
            url={community.url}
            id={community.id}
          />
        </div>
        <CountryCommunity
          community={communityList}
          country={community.countryName}
        />

        <LocalUsers
          users={users}
          members={community.users}
          joined={joined}
          communityId={community.id}
          userId={session?.user.id}
        />
      </div>
      <div className=" rounded-sm shadow-sm ">
        <NewPost
          componentId={community.id}
          user={{
            id: session?.user.id,
            name: session?.user.name,
          }}
        />
        <OldPosts id={community.id} />
      </div>
    </div>
  );
}
