"use client";

import { useState } from "react";

interface Option {
  id: number;
  name: string;
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
  // Starea pentru selectul activ
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChange = (type: string, id: number | "") => {
    if (id === "") {
      setSelectedType(null);
      setSelectedId(null);
      return;
    }
    setSelectedType(type);
    setSelectedId(id);

    // Resetează toate celelalte selecte
    document.querySelectorAll("select").forEach((el) => {
      const selectEl = el as HTMLSelectElement;
      if (selectEl.name !== type) selectEl.value = "";
    });
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedType || !selectedId) {
    alert("Selectează o singură opțiune pentru update!");
    return;
  }

  // Redirecționăm către /admin/editplace cu query
  window.location.href = `/admin/editplace?type=${selectedType}&id=${selectedId}`;
};

  const selectClass =
    "border border-gray-300 rounded p-2 w-full mb-4 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Places</h2>
      <form onSubmit={handleSubmit}>
        {/* Country */}
        <label className="block mb-2 font-semibold">Country</label>
        <select
          className={selectClass}
          name="country"
          onChange={(e) => handleChange("country", Number(e.target.value))}
        >
          <option value="">Select a country</option>
          {countrys.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Region */}
        <label className="block mb-2 font-semibold">Region</label>
        <select
          className={selectClass}
          name="region"
          onChange={(e) => handleChange("region", Number(e.target.value))}
        >
          <option value="">Select a region</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {/* Takeoff */}
        <label className="block mb-2 font-semibold">Takeoff</label>
        <select
          className={selectClass}
          name="takeoff"
          onChange={(e) => handleChange("takeoff", Number(e.target.value))}
        >
          <option value="">Select a takeoff</option>
          {takeoffs.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Landing */}
        <label className="block mb-2 font-semibold">Landing</label>
        <select
          className={selectClass}
          name="landing"
          onChange={(e) => handleChange("landing", Number(e.target.value))}
        >
          <option value="">Select a landing</option>
          {landings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
        >
          Update
        </button>
      </form>

      {selectedType && selectedId && (
        <p className="mt-4 text-center text-green-600">
          Selected {selectedType} with ID: {selectedId}
        </p>
      )}
    </div>
  );
}
