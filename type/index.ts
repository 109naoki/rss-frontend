interface Enclosure {
  url: string;
  length: string;
  type: string;
}

interface ZennItem {
  title: string;
  link: string;
  pubDate: string;
  enclosure: Enclosure;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
}

export type Zenn = {
  items: ZennItem[];
};

type Qiita = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  id: string;
  isoDate: Date;
};
