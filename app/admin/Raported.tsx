import React from "react";

interface Comment {
  id: number;
  comment: string;
  raport: number;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
  };
}

interface RaportedProps {
  comments: {
    country: Comment[] | null;
    region: Comment[] | null;
    takeoff: Comment[] | null;
    landing: Comment[] | null;
  };
}

const Raported: React.FC<RaportedProps> = ({ comments }) => {
  const countryCount = comments.country?.length ?? 0;
  const regionCount = comments.region?.length ?? 0;
  const takeoffCount = comments.takeoff?.length ?? 0;
  const landingCount = comments.landing?.length ?? 0;

  const total = countryCount + regionCount + takeoffCount + landingCount;

  return (
    <div className="space-y-2 p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold">Comentarii raportate:</h2>
      {total === 0 ? (
        <p>Nu există niciun comentariu raportat momentan.</p>
      ) : (
        <ul className="list-disc ml-5">
          {countryCount > 0 && <li>Country: {countryCount}</li>}
          {regionCount > 0 && <li>Region: {regionCount}</li>}
          {takeoffCount > 0 && <li>Takeoff: {takeoffCount}</li>}
          {landingCount > 0 && <li>Landing: {landingCount}</li>}
        </ul>
      )}
    </div>
  );
};

export default Raported;
