"use client";

import { useState, useMemo } from "react";
import { CldImage } from "next-cloudinary";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface MapProps {
  map: string;     // imaginea curentă
  maps: string[];  // lista de imagini
}

export default function ViewRegionMap({ map, maps }: MapProps) {
  const [open, setOpen] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const slides = useMemo(() => {
    return maps.map((m) => ({
      src: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${m}`
    }));
  }, [maps, cloudName]);

  const startIndex = maps.indexOf(map);

  return (
    <>
      <CldImage
        src={map}
        width={500}
        height={500}
        crop="fill"
        gravity="auto"
        aspectRatio="16:9"
        alt="Region map"
        style={{ objectFit: "cover", cursor: "pointer" }}
        quality="auto"
        onClick={() => setOpen(true)}
      />

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={Math.max(startIndex, 0)}
          plugins={[Zoom]}
        />
      )}
    </>
  );
}
