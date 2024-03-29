"use client";
import { Zenn } from "@/type";
import { FC } from "react";
type Props = {
  zenn: Zenn;
};

export const View: FC<Props> = ({ zenn }) => {
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
    </>
  );
};
