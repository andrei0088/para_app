"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Option {
  id: number;
  name: string;
  countryId?: number;
  regionId?: number;
}

interface ViewPlacesEditProps {
  countrys: Option[];
  regions: Option[];
  takeoffs: Option[];
  landings: Option[];
}

export default function ViewPlacesEdit({
  countrys,
  regions,
  takeoffs,
  landings,
}: ViewPlacesEditProps) {
  const [selectedCountry, setSelectedCountry] = useState<number | "">("");
  const [selectedRegion, setSelectedRegion] = useState<number | "">("");

  const [selectedType, setSelectedType] = useState<
    "c" | "r" | "t" | "l" | null
  >(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const resetSelection = () => {
    setSelectedType(null);
    setSelectedId(null);
  };
  const router = useRouter();

  const handleSelect = (type: "c" | "r" | "t" | "l", id: number) => {
    setSelectedType(type);
    setSelectedId(id);
  };

  // Afișare nume selectat
  const getSelectedName = () => {
    if (!selectedType || !selectedId) return "";

    if (selectedType === "c")
      return countrys.find((c) => c.id === selectedId)?.name ?? "";

    if (selectedType === "r")
      return regions.find((r) => r.id === selectedId)?.name ?? "";

    if (selectedType === "t")
      return takeoffs.find((t) => t.id === selectedId)?.name ?? "";

    if (selectedType === "l")
      return landings.find((l) => l.id === selectedId)?.name ?? "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !selectedId) return;

    const path = `/admin/edit?type=${selectedType}&id=${selectedId}`;
    router.push(path); // ✅ Navigăm la pagina de editare
  };

  const selectClass =
    "border border-gray-300 rounded p-2 w-full mb-4 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Places</h2>

      <form onSubmit={handleSubmit}>
        {/* Select Country */}
        <label className="block mb-2 font-semibold">Country</label>
        <select
          className={selectClass}
          value={selectedCountry}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            setSelectedCountry(val);
            setSelectedRegion("");
            resetSelection();
            if (val !== "") handleSelect("c", val);
          }}
        >
          <option value="">All countries</option>
          {countrys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Select Region */}
        <label className="block mb-2 font-semibold">Region</label>
        <select
          className={selectClass}
          value={selectedRegion}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            setSelectedRegion(val);
            resetSelection();
            if (val !== "") handleSelect("r", val);
          }}
        >
          <option value="">All regions</option>
          {regions
            .filter(
              (r) => selectedCountry === "" || r.countryId === selectedCountry
            )
            .map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
        </select>

        {/* Select Takeoff */}
        <label className="block mb-2 font-semibold">Takeoff</label>
        <select
          className={selectClass}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            resetSelection();
            if (val !== "") handleSelect("t", val);
          }}
        >
          <option value="">Select takeoff</option>
          {takeoffs
            .filter(
              (t) =>
                (selectedCountry === "" || t.countryId === selectedCountry) &&
                (selectedRegion === "" || t.regionId === selectedRegion)
            )
            .map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
        </select>

        {/* Select Landing */}
        <label className="block mb-2 font-semibold">Landing</label>
        <select
          className={selectClass}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            resetSelection();
            if (val !== "") handleSelect("l", val);
          }}
        >
          <option value="">Select landing</option>
          {landings
            .filter(
              (l) =>
                (selectedCountry === "" || l.countryId === selectedCountry) &&
                (selectedRegion === "" || l.regionId === selectedRegion)
            )
            .map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          disabled={!selectedType || !selectedId}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full disabled:bg-gray-300 disabled:hover:bg-gray-300"
        >
          Edit selected
        </button>
      </form>

      {selectedType && selectedId && (
        <p className="mt-4 text-center text-green-600">
          Selected → <b>{getSelectedName()}</b> ({selectedType.toUpperCase()})
          [ID: {selectedId}]
        </p>
      )}
    </div>
  );
}
