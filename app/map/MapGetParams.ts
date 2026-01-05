"use client";

import { useSearchParams } from "next/navigation";

export default function MapGetParams() {
  const searchParams = useSearchParams();
  const country = searchParams.get("country") || null;
  if (country) return { id: Number(country), type: "c" };
  const region = searchParams.get("region") || null;
  if (region) return { id: Number(region), type: "r" };
  if (searchParams.get("takeoff")) {
    return {
      id: Number(searchParams.get("takeoff")),
      type: "t",
    };
  }
  if (searchParams.get("landing")) {
    return {
      id: Number(searchParams.get("landing")),
      type: "l",
    };
  }
  return null;
}
