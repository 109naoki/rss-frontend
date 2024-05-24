import { Metadata } from "next";
import { View } from "./View";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_TITLE} - ログイン`,
};

export default async function Page() {
  return <View />;
}
