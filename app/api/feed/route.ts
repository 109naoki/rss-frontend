import Parser from "rss-parser";

const parser = new Parser();

export async function GET(request: Request) {
  try {
    const feed = await parser.parseURL(process.env.NEXT_PUBLIC_ZENN_FEED_URL!);
    if (!feed) {
      throw new Error("Failed to fetch Zenn feed");
    }

    return new Response(JSON.stringify({ data: feed }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "データの取得中にエラーが発生しました。" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
