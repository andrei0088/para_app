"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Map, CalendarDays, Sun } from "lucide-react";

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

const displaySeason = [
  { id: 1, name: "Spring", emoji: "🌱" },
  { id: 2, name: "Summer", emoji: "☀️" },
  { id: 3, name: "Autumn", emoji: "🍂" },
  { id: 4, name: "Winter", emoji: "❄️" },
];

export default function ExploreClient({
  countrys,
  regions,
}: {
  countrys: { id: number; name: string }[];
  regions: { id: number; name: string }[];
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 tracking-tight">
        Explore the World
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Season */}
        <SectionCard
          title="Select a Season"
          icon={<Sun className="w-5 h-5 text-blue-600" />}
          items={displaySeason.map((s) => ({
            href: `/season/${s.id}`,
            label: `${s.emoji} ${s.name}`,
          }))}
        />

        {/* Month */}
        <SectionCard
          title="Select a Month"
          icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
          items={MonthNames.map((m, idx) => ({
            href: `/month/${idx + 1}`,
            label: m,
          }))}
        />

        {/* Country */}
        <SectionCard
          title="Select a Country"
          icon={<Globe className="w-5 h-5 text-blue-600" />}
          items={countrys.map((c) => ({
            href: `/country/${c.id}`,
            label: c.name,
          }))}
        />

        {/* Region */}
        <SectionCard
          title="Select a Region"
          icon={<Map className="w-5 h-5 text-blue-600" />}
          items={regions.map((r) => ({
            href: `/region/${r.id}`,
            label: r.name,
          }))}
        />
      </div>
    </div>
  );
}

/* ---- Componentă Reutilizabilă ---- */
function SectionCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: { href: string; label: string }[];
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-blue-100 text-gray-800 font-medium transition-colors duration-150"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
