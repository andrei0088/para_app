import { get_country_description } from "../action";
import EditPage from "./EditPage";

export default async function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const prop = await searchParams;
  const id = Number(prop.id);
  const desc = await get_country_description(id); // JS object

  return (
    <div className="p-6">
      {/* Pass only serializable data */}
      <EditPage desc={desc} id={id} />
    </div>
  );
}
