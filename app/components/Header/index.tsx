"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const Header: FC = () => {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    return pathname === path
      ? "text-red-500 no-underline whitespace-nowrap"
      : "text-gray-800 no-underline whitespace-nowrap";
  };

  return (
    <header className="flex flex-col items-center max-w-2xl mx-auto mb-12 mt-6">
      <div className="flex items-center justify-between w-full py-2.5 px-5">
        <Link href="#">
          <Image src="/logo.webp" width={100} height={100} alt="Logo" />
        </Link>
        <Link href="/login" className="no-underline whitespace-nowrap">
          ログイン
        </Link>
      </div>
      <nav className="w-full">
        <ul className="flex items-center justify-center m-0 p-0 overflow-x-auto whitespace-nowrap">
          <li className="px-2.5 py-2.5 whitespace-nowrap md:px-5">
            <Link href="/" className={getLinkClassName("/")}>
              トレンド
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link href="/tech" className={getLinkClassName("/tech")}>
              企業ブログ
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link href="/seminar" className={getLinkClassName("/seminar")}>
              セミナー
            </Link>
          </li>
          <li className="px-2.5 py-2.5 whitespace-nowrap">
            <Link href="/follow" className={getLinkClassName("/follow")}>
              フォロー
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
