import Link from "next/link";

type Props = {
  community: {
    id: number;
    name: string;
    url: string;
  }[];
  country: string | null;
};

export default function CountryCommunity({ community, country }: Props) {
  return (
    <section className="p-6 rounded-sm shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">
        Communities in {country ?? "this country"}
      </h2>

      <ul className="mt-2 list-disc list-inside max-h-64 overflow-auto">
        {community.map((c) => (
          <li key={c.id} className="text-cyan-900 ">
            <Link href={`/community/${c.url}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
