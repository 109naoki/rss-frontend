import Parser from "rss-parser";

const parser = new Parser();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const category = params.slug;

  console.log(category);
  try {
    const [zennData, qiitaData] = await Promise.all([
      parser.parseURL(`https://zenn.dev/topics/${category}/feed`),
      parser.parseURL(`https://qiita.com/tags/${category}/feed.atom`),
    ]);
    console.log(zennData, qiitaData);

    return new Response(
      JSON.stringify({ data: [...zennData.items, ...qiitaData.items] }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
