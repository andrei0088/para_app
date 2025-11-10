import React from "react";

interface Season {
  name: string;
  emoji: string;
  months: number[];
}

interface BestSeasonProps {
  months: number[]; // lunile active pentru locul respectiv
}

const BestSeason = ({ months }: BestSeasonProps) => {
  const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Definim toate sezoanele
  const allSeasons: Season[] = [
    { name: "Spring", emoji: "🌱", months: [3, 4, 5] },
    { name: "Summer", emoji: "☀️", months: [6, 7, 8] },
    { name: "Autumn", emoji: "🍂", months: [9, 10, 11] },
    { name: "Winter", emoji: "❄️", months: [12, 1, 2] },
  ];

  // Determinăm sezoanele relevante pentru lunile primite
  const relevantSeasons = allSeasons.filter((season) =>
    season.months.some((month) => months.includes(month))
  );

  return (
    <div className="flex flex-col space-y-2 mt-2">
      {/* Sezoane */}
      <div className="flex flex-wrap gap-2">
        {relevantSeasons.map((s: Season, idx: number) => (
          <span
            key={idx}
            className="flex items-center gap-1 text-gray-800 font-semibold text-sm md:text-base"
          >
            <span>{s.emoji}</span>
            <span>{s.name}</span>
          </span>
        ))}
      </div>

      {/* Lunile active */}
      <div className="flex flex-wrap gap-2">
        {months.map((m: number) => (
          <span
            key={m}
            className="text-gray-600 font-medium text-xs md:text-sm"
          >
            {MonthNames[m - 1]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BestSeason;
