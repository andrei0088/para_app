import ChangeMap from "./ChangeMap";
import {
  get_country_maps,
  get_region_maps,
  get_takeoff_maps,
  get_landing_maps,
} from "./function";

interface PageProps {
  searchParams: {
    type?: string;
    id?: string; // string, nu number (Next.js)
  };
}

export default async function ChangeMapPage({ searchParams }: PageProps) {
  const props = await searchParams;
  const type = props.type;
  const id = Number(props.id);

  if (!type || !id) return <div>Invalid parameters</div>;

  let map = null;

  if (type === "c") {
    map = await get_country_maps(id);
  }
  if (type === "r") {
    map = await get_region_maps(id);
  }
  if (type === "t") {
    map = await get_takeoff_maps(id);
  }
  if (type === "l") {
    map = await get_landing_maps(id);
  }

  if (!map) return <div>Map not found</div>;

  return <ChangeMap map={map} type={type} />;
}
