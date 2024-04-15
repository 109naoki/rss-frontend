import { getServerSession } from "next-auth";
import { View } from "./View";
import { authOptions } from "@/lib/authOption";

export const revalidate = 43200;

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <View session={session} />;
}
