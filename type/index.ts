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

export type SeminarItem = {
  title: string;
  link: string;
  pubDate: string;
  summary: string;
  id: string;
  isoDate: string;
};

export type Seminar = {
  items: SeminarItem[];
};

export type Zenn = {
  items: ZennItem[];
};

export type Tech = {
  items: ZennItem[];
};

// type Qiita = {
//   title: string;
//   link: string;
//   pubDate: string;
//   author: string;
//   content: string;
//   id: string;
//   isoDate: Date;
// };
