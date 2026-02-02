import { get_posts } from "./action";
import EditRaportDelete from "./EditRaportDelete";
import Top from "./Top";
import Link from "next/link";

type OldPostsProps = {
  id: number;
};

export default async function OldPosts({ id }: OldPostsProps) {
  const { succes, messages } = await get_posts(id);
  if (!succes)
    return (
      <section className="py-6 text-center text-sm text-gray-500">
        No posts yet — be the first to share something
      </section>
    );

  return (
    <section className="w-full space-y-4">
      <ul className="space-y-4 mt-4">
        {messages.map((m, index) => (
          <li key={index}>
            <article className="rounded-sm p-4 shadow-sm transition hover:shadow-md">
              {/* Header */}
              <div className="grid grid-cols-3 items-center text-sm text-gray-500">
                <div className="truncate">
                  <span className="font-medium text-gray-900">
                    <Link href={`/profile/${m.profileUrl}`}>{m.userName}</Link>
                  </span>
                  <span className="mx-1 text-gray-400">•</span>
                  <time dateTime={m.createdAt.toISOString()}>
                    {m.createdAt.toLocaleDateString()}
                  </time>
                </div>

                <Top id={m._id.toString()} />

                <EditRaportDelete id={m._id.toString()} />
              </div>

              {/* Content */}
              <div className="mt-3 text-sm leading-relaxed text-gray-800">
                {m.message}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
