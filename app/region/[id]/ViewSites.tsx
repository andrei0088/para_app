import { Landing, Takeoff } from "@/app/types";
import Link from "next/link";

interface ViewSitesProps {
  takeoff: Takeoff[];
  landing: Landing[];
}

const ViewSites = ({ takeoff, landing }: ViewSitesProps) => {
  return (
    <div>
      <div className="bg-gray-50  rounded-xl p-4 border border-gray-200  shadow-sm">
        <h3 className="font-semibold text-gray-900  mb-2">Takeoffs:</h3>
        {takeoff.length > 0 ? (
          <ul className="ml-4 list-disc space-y-1 text-gray-700 ">
            {takeoff.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/takeoff/${t.id}`}
                  className="hover:text-green-600 "
                >
                  {t.name} - {t.altitude}m
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500  italic">
            No takeoffs available.
          </p>
        )}
      </div>

      {/* Landings */}
      <div className="bg-gray-50  rounded-xl p-4 border border-gray-200  shadow-sm">
        <h3 className="font-semibold text-gray-900  mb-2">Landings:</h3>
        {landing.length > 0 ? (
          <ul className="ml-4 list-disc space-y-1 text-gray-700 ">
            {landing.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/landing/${l.id}`}
                  className="hover:text-green-600 "
                >
                  {l.name} - {l.altitude}m
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500  italic">
            No landings available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewSites;
