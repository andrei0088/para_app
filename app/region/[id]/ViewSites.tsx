import { Landing, Takeoff } from "@/app/types";
import Link from "next/link";

interface ViewSitesProps {
  takeoff: Takeoff[];
  landing: Landing[];
}

const ViewSites = ({ takeoff, landing }: ViewSitesProps) => {
  return (
    <div>
      <div className="bg-white  rounded-sm p-4 shadow-sm space-y-2 mb-4">
        <h3 className="font-semibold mb-2">Takeoffs:</h3>
        {takeoff.length > 0 ? (
          <ul className="ml-4 list-disc space-y-1 text-slate-900 ">
            {takeoff.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/takeoff/${t.id}`}
                  className="hover:text-slate-600 "
                >
                  {t.name} {t.wind && `( ${t.wind} )`} - {t.altitude}m
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">No takeoffs available.</p>
        )}
      </div>

      {/* Landings */}
      <div className="bg-white  rounded-sm p-4 shadow-sm">
        <h3 className="font-semibold mb-2">Landings:</h3>
        {landing.length > 0 ? (
          <ul className="ml-4 list-disc space-y-1 text-slate-900 ">
            {landing.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/landing/${l.id}`}
                  className="hover:text-slate-600 "
                >
                  {l.name} - {l.altitude}m
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic">No landings available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewSites;
