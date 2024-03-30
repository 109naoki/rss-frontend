"use client";

import { Seminar } from "@/type";
import { FC } from "react";
type Props = {
  seminar: Seminar;
};

export const View: FC<Props> = ({ seminar }) => {
  return (
    <>
      <div>
        <h1>techのフィード</h1>
        <ul>
          {seminar.items.map((item) => (
            <li key={item.link}>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
