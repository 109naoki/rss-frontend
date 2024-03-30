"use client";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="flex flex-col items-center max-w-2xl mx-auto">
      <div className="py-2.5 px-5 inline-block">
        <a href="#">
          <img
            src="https://emmieworks.github.io/open-labo/assets/logo/sample-logo.png"
            className="w-15 h-15"
            alt="Logo"
          />
        </a>
      </div>
      <nav>
        <ul className="flex items-center justify-center  m-0 p-0 overflow-x-auto whitespace-nowrap">
          <li className="px-2.5 py-2.5 whitespace-nowrap md:px-5">
            <Link
              href="/"
              className="text-gray-800 no-underline whitespace-nowrap "
            >
              トレンド
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link
              href="/tech"
              className="text-gray-800 no-underline whitespace-nowrap md:px-5"
            >
              企業ブログ
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link
              href="/tech"
              className="text-gray-800 no-underline whitespace-nowrap md:px-5"
            >
              セミナー
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link
              href="#"
              className="text-gray-800 no-underline whitespace-nowrap md:px-5"
            >
              フォロー
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
