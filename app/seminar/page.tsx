import Parser from "rss-parser";
import { View } from "./View";

export const revalidate = 43200;

const fetchSeminar = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_SEMINAR_FEED_URL!);
  if (!feed) {
    throw new Error("Failed to fetch Zenn feed");
  }

  const plainFeed = {
    items: feed.items.map((item) => ({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      summary: item.summary || "",
      id: item.guid || "",
      isoDate: item.isoDate
        ? new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          }).format(new Date(item.isoDate))
        : "",
    })),
  };

  return plainFeed;
};
export default async function Page() {
  const seminar = await fetchSeminar();

  if (!seminar) {
    <h1>データが取得できませんでした。</h1>;
  }

  return <View seminar={seminar} />;
}
