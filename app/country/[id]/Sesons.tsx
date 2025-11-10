interface Season {
  name: string;
  emoji: string;
  months: number[];
}

interface SesonsProps {
  seasons: Season[];
  months: number[];
}

const Sesons = ({ seasons, months }: SesonsProps) => {
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

  return (
    <div className="col-span-1 order-2 lg:order-1 flex flex-col space-y-4 md:space-y-6 mb-5">
      {/* Sezoane */}
      <div className="flex flex-wrap gap-2">
        {seasons.map((s: Season, idx: number) => (
          <span
            key={idx}
            className="flex items-center gap-1 text-gray-800  font-semibold text-sm md:text-base"
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
            className="text-gray-600  font-medium text-xs md:text-sm"
          >
            {MonthNames[m - 1]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sesons;
