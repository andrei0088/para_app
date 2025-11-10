"use client";

import { useState, useMemo } from "react";
import { CldImage } from "next-cloudinary";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface RegionMap {
  map: string; // URL imagine
  name?: string; // opțional
}

interface MapProps {
  maps: RegionMap[];
}

export default function ViewRegionMap({ maps }: MapProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const slides = useMemo(() => {
    return maps.map((m) => ({
      src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${m.map}`,
    }));
  }, [maps, cloudName]);

  return (
    <>
      <div className="flex flex-col my-3 gap-4">
        {" "}
        {/* Imagini una sub alta */}
        {maps.map((m, i) => (
          <CldImage
            key={i}
            src={m.map}
            width={800}
            height={500}
            crop="fill"
            gravity="auto"
            aspectRatio="16:9"
            alt={m.name ?? "Region map"}
            style={{ objectFit: "cover", cursor: "pointer" }}
            className="rounded-xl cursor-pointer w-full"
            quality="auto"
            onClick={() => {
              setIndex(i); // setează indexul imaginii pe care ai dat click
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index} // începe cu imaginea apăsată
        plugins={[Zoom]}
      />
    </>
  );
}
