"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { uploadNewMap } from "./action";

type MapType = {
  id: number;
  name: string;
  map?: string | null;
  image?: string | null;
};

interface ChangeMapProps {
  map: MapType;
  type: string; // c, r, t, l
}

export default function ChangeMap({ map, type }: ChangeMapProps) {
  const router = useRouter();

  const oldUrl = map.map || map.image || null;
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  async function changeImage(formData: FormData) {
    const file = formData.get("mapFile") as File | null;

    // Dacă nu a selectat nimic, nu facem nimic
    if (!file || file.size === 0) {
      return;
    }

    setUploading(true);
    const result = await uploadNewMap(formData);
    setUploading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      alert("Upload error");
    }
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Change Map for {map.name}
      </h2>

      {/* IMAGINEA ACTUALĂ */}
      {!preview && oldUrl && (
        <div className="mb-6 flex justify-center">
          <CldImage
            src={oldUrl}
            width={800}
            height={500}
            crop="fill"
            gravity="auto"
            alt="Current map"
            className="rounded border border-gray-300"
          />
        </div>
      )}

      {/* PREVIEW IMAGINE NOUĂ */}
      {preview && (
        <div className="mb-6 flex justify-center relative w-[800px] h-[500px] rounded border border-gray-400 overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* FORMULAR */}
      <form
        action={changeImage}
        className="flex flex-col items-center gap-4 bg-gray-50 p-4 rounded border border-gray-200"
      >
        {/* ID și TYPE */}
        <input type="hidden" name="id" value={map.id} />
        <input type="hidden" name="type" value={type} />

        {/* URL vechi */}
        <input type="hidden" name="oldUrl" value={oldUrl || ""} />

        <label className="block text-gray-700 font-semibold">
          Select new map image:
        </label>
        <input
          type="file"
          name="mapFile"
          accept="image/*"
          onChange={handlePreview}
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />

        <button
          type="submit"
          disabled={uploading}
          className={`mt-2 px-6 py-2 rounded text-white font-semibold transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload New Map"}
        </button>
      </form>
    </div>
  );
}
