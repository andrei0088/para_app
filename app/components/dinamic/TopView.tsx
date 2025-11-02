import { get_top, get_user_top } from "@/app/api/get/get_top";
import TopClient from "./ViewTopClient";

interface TopViewProps {
  component: "c" | "r" | "t" | "l"; // country, region, takeoff, landing
  id: number;
}

export default async function TopView({ component, id }: TopViewProps) {
  // Preia numărul total de likes
  const top = await get_top({ component, id });

  // Verifică dacă user-ul a dat like
  const activ = await get_user_top({ component, id });

  return (
    <TopClient 
      component={component}
      id={id}
      top={top}
      activ={activ}
    />
  );
}
