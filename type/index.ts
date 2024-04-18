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
  isoDate: Date;
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
export type PostItem = {
  name: string;
  link: string;
  date: string;
  url: string;
};

export type Item = {
  title: string;
  link: string;
  enclosure: {
    url: string;
  };
  isoDate: string;
};

export type AuthHeaders = {
  Authorization: string;
};

export type Article = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  url: string;
  link: string;
  date: string;
  userID: number;
};

export type MyItemData = {
  data: Article[];
};
