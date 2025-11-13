import { redirect } from "next/navigation";
import CountryEdit from "./CountryEdit";
import RegionEdit from "./RegionEdit";
import TakeoffEdit from "./TakeoffEdit";
import LandingEdit from "./LandingEdit";

import {
  get_country,
  get_country_name,
  get_landing,
  get_region,
  get_region_name,
  get_takeoff,
} from "./action";

export default async function EditPage({
  searchParams,
}: {
  searchParams: { type: string; id: string }; // id vine ca string din URL
}) {
  const { type, id } = await searchParams;
  const numericId = Number(id); // ✅ convertim la number
  if (isNaN(numericId)) {
    // ID invalid, redirect
    redirect("/");
  }

  switch (type) {
    case "c": {
      const country = await get_country(numericId);
      if (!country) redirect("/");
      return <CountryEdit country={country} />;
    }

    case "r": {
      const region = await get_region(numericId);
      const country = await get_country_name();
      if (!region) redirect("/");
      return <RegionEdit region={region} countries={country} />;
    }

    case "t": {
      const country = await get_country_name();
      const region = await get_region_name();
      const takeoff = await get_takeoff(numericId);
      if (!takeoff) redirect("/");

      return (
        <TakeoffEdit countries={country} regions={region} takeoff={takeoff} />
      );
    }

    case "l": {
      const country = await get_country_name();
      const region = await get_region_name();
      const landing = await get_landing(numericId);
      if (!landing) redirect("/");
      return (
        <LandingEdit countries={country} regions={region} landing={landing} />
      );
    }
    default:
      redirect("/");
  }
}
