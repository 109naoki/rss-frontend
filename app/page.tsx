import Parser from "rss-parser";
import { View } from "./View";

import { fetchItems } from "@/lib/api";
import { useAuthorizationHeaders } from "@/hooks/useAuthorizationHeaders/server";

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

export default async function Page() {
  const zenn = await fetchZenn();

  const token = await useAuthorizationHeaders();

  let response = null;

  if (token.Authorization === "Bearer undefined") {
    response = null;
  } else {
    response = await fetchItems(token);
  }

  return <View zenn={zenn} token={token} myItem={response} />;
}
