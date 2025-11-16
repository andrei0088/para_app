"use client";
import { CldImage } from "next-cloudinary";
import mapD from "@/public/map_xc_gen3.jpg";
import Image from "next/image";
import { Suspense } from "react";

interface CountryImageProps {
  map?: string; // optional map URL
  name: string; // country name
}

const CountryImage = ({ map, name }: CountryImageProps) => {
  return (
    <>
      {map ? (
        <Suspense fallback={<div>Loading image...</div>}>
          <CldImage
            src={map}
            width={2500}
            height={1768}
            crop="fill"
            gravity="auto"
            aspectRatio="16:9"
            alt={`${name} xc route map`}
            style={{ objectFit: "cover", cursor: "pointer" }}
            className="w-full z-0"
            quality="auto"
          />
        </Suspense>
      ) : (
        <>
          <Image
            src={mapD}
            alt={`${name} xc route map`}
            width={2500}
            height={2500}
            className="w-full z-0"
          />

          {/* Gradient – sub text */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent z-10"></div>

          {/* Text – deasupra gradientului */}
          <div className="absolute inset-0 flex items-end p-6 z-20">
            <div
              className="
        text-xl md:text-2xl xl:text-3xl font-extrabold text-yellow-400
        drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]
        tracking-wide uppercase
      "
            >
              <span className="opacity-90">Flying in</span>
              <span className="italic ml-2 decoration-yellow-300">{name}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CountryImage;
