interface Enclosure {
  url: string;
  length: string;
  type: string;
}

type Zenn = {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  enclosure: Enclosure;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: Date;
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
