export interface Site {
  latitude: number;
  longitude: number;
  name?: string;
}

export default function calculateGPSCenter(
  sites: Site[],
  fallbackSites?: Site[]
): [number, number] {
  // Folosim fallback dacă lista principală e goală
  if ((!sites || sites.length === 0) && fallbackSites?.length) {
    sites = fallbackSites;
  }

  if (!sites || sites.length === 0) {
    return [0, 0]; // fallback absolut
  }

  let sumLat = 0;
  let sumLng = 0;
  let count = 0;

  for (const site of sites) {
    // Ignorăm valori invalide
    if (
      typeof site.latitude === "number" &&
      !isNaN(site.latitude) &&
      typeof site.longitude === "number" &&
      !isNaN(site.longitude)
    ) {
      sumLat += site.latitude;
      sumLng += site.longitude;
      count++;
    }
  }

  if (count === 0) return [0, 0];

  const avgLat = sumLat / count;
  const avgLng = sumLng / count;

  return [avgLat, avgLng];
}
