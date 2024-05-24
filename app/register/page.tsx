import { Metadata } from "next";
import { View } from "./View";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_TITLE} - 新規登録`,
};

export default async function Page() {
  return <View />;
}
