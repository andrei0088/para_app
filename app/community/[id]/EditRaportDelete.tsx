import { get_raport } from "./action";
import EditDeleteClient from "./EditDeleteClient";
import RaportClient from "./RaportClient";

type Props = {
  id: string;
};

export default async function EditRaportDelete({ id }: Props) {
  const { logdin, owner, message } = await get_raport(id);
  if (!logdin) return null;
  if (!owner) return <RaportClient postId={id} />;

  return <EditDeleteClient postId={id} initialMessage={message} />;
}
