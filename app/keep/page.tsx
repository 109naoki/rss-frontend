import { View } from "./View";
import { fetchItems } from "@/lib/api";
import { useAuthorizationHeaders } from "@/hooks/useAuthorizationHeaders/server";

export const revalidate = 43200;

export default async function Page() {
  const session = await useAuthorizationHeaders();

  const response = await fetchItems(session);

  return <View session={session} items={response} />;
}
