import { View } from "./View";
import { fetchItems } from "@/lib/api";
import { useAuthorizationHeaders } from "@/hooks/useAuthorizationHeaders/server";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_TITLE} - ブックマーク`,
};

export const revalidate = 43200;

export default async function Page() {
  const token = await useAuthorizationHeaders();

  let response = null;

  if (token.Authorization === "Bearer undefined") {
    response = null;
  } else {
    response = await fetchItems(token);
  }

  return <View token={token} items={response} />;
}
