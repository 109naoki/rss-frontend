import Parser from "rss-parser";
import { View } from "./View";
import { useAuthorizationHeaders } from "@/hooks/useAuthorizationHeaders/server";
import { fetchItems } from "@/lib/api";

export const revalidate = 43200;

const fetchTech = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_TECH_FEED_URL!);
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
export default async function Page() {
  const tech = await fetchTech();
  const token = await useAuthorizationHeaders();

  let response = null;

  if (token.Authorization === "Bearer undefined") {
    response = null;
  } else {
    response = await fetchItems(token);
  }

  return <View tech={tech} token={token} myItem={response} />;
}
