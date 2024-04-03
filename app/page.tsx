import Parser from "rss-parser";
import { View } from "./View";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth/next";
export const revalidate = 43200;

const fetchZenn = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_ZENN_FEED_URL!);
  if (!feed) {
    throw new Error("Failed to fetch Zenn feed");
  }

  const plainFeed = {
    items: feed.items.map((item) => ({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      creator: item.creator || "",
      content: item.content || "",
      contentSnippet: item.contentSnippet || "",
      guid: item.guid || "",
      isoDate: item.isoDate ? item.isoDate.toString() : "",
      enclosure: {
        url: item.enclosure?.url || "",
        length: item.enclosure?.length?.toString() || "0",
        type: item.enclosure?.type || "",
      },
    })),
  };

  return plainFeed;
};
// const fetchQiita = async () => {
//   const parser = new Parser();
//   const feed = await parser.parseURL(process.env.NEXT_PUBLIC_QIITA_FEED_URL!);
//   if (!feed) {
//     throw new Error("Failed to fetch Qiita feed");
//   }

//   return feed;
// };

export default async function Page() {
  const zenn = await fetchZenn();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  if (!zenn) {
    <h1>データが取得できませんでした。</h1>;
  }

  return <View zenn={zenn} />;
}
