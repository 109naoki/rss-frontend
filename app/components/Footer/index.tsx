"use client";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center max-w-2xl mx-auto">
      <nav>
        <ul className="flex items-center justify-center  m-0 p-0 overflow-x-auto whitespace-nowrap">
          <li className="px-2.5 py-2.5 whitespace-nowrap md:px-5">
            <a
              href="#"
              className="text-gray-800 no-underline whitespace-nowrap "
            >
              トレンド
            </a>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <a
              href="#"
              className="text-gray-800 no-underline whitespace-nowrap md:px-5"
            >
              企業ブログ
            </a>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <a
              href="#"
              className="text-gray-800 no-underline whitespace-nowrap md:px-5"
            >
              フォロー中のタグ
            </a>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap md:px-5">
            <a
              href="#"
              className="text-gray-800 no-underline whitespace-nowrap"
            >
              検索
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
