import Parser from "rss-parser";

export const revalidate = 43200;

const fetchZenn = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_ZENN_FEED_URL!);
  if (!feed) {
    throw new Error("Failed to fetch Zenn feed");
  }

  return feed;
};
const fetchQiita = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.NEXT_PUBLIC_QIITA_FEED_URL!);
  if (!feed) {
    throw new Error("Failed to fetch Qiita feed");
  }
  console.log(feed.items[0]);
  return feed;
};

export default async function Home() {
  const [zenn, qiita] = await Promise.all([fetchZenn(), fetchQiita()]);

  if (!zenn || !qiita) {
    <h1>データが取得できませんでした。</h1>;
  }

  return (
    <>
      <div>
        <h1>zennのフィード</h1>
        <ul>
          {zenn.items.map((item) => (
            <li key={item.link}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              {item.enclosure && item.enclosure.url && (
                <img src={item.enclosure.url} alt="記事の画像" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Qiitaのフィード</h1>
        <ul>
          {qiita.items.map((item) => (
            <li key={item.link}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
                <img src={item.link} alt="記事の画像" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
