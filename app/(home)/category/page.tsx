import { Metadata } from "next";
import { View } from "./View";

export const metadata: Metadata = {
  title: ` - category`,
};

export default async function Page() {
  return <View />;
}
