"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const Header: FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getLinkClassName = (path: string) => {
    return pathname === path
      ? "text-red-800 whitespace-nowrap"
      : "text-gray-800 whitespace-nowrap";
  };

  const links = [
    {
      href: "/login",
      label: "ログアウト",
      action: () => signOut(),
      icon: <LogoutIcon />,
    },
  ];
  return (
    <header className="flex flex-col items-center max-w-2xl mx-auto  mt-6">
      <div className="flex items-center justify-between w-full py-2.5 px-5">
        <Link href="/">
          <Image src="/logo.webp" width={100} height={100} alt="Logo" />
        </Link>
        {!session?.user?.token && (
          <Link href="/login" className="font-bold text-lg whitespace-nowrap">
            ログイン
          </Link>
        )}
        {session?.user?.token && (
          <>
            <Menu as="div" className="relative">
              <Menu.Button>
                <AccountCircleIcon className="cursor-pointer w-14 h-14" />
              </Menu.Button>
              <Menu.Items className="flex flex-col absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-lg outline-none z-50">
                {links.map((link) => (
                  <Menu.Item key={link.href} as={Fragment}>
                    {({ active }) => (
                      <a
                        href={link.href}
                        className={`${active ? "bg-blue-500 text-white" : "bg-white text-black"} flex items-center p-2 space-x-2`}
                        onClick={link.action}
                        style={{ minHeight: "40px" }}
                      >
                        <span className="flex items-center justify-center">
                          {link.icon}
                        </span>
                        <span style={{ marginLeft: "8px" }}>{link.label}</span>{" "}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </>
        )}
      </div>
      <nav className="w-full">
        <ul className="flex items-center justify-center overflow-x-auto whitespace-nowrap">
          <li className="font-bold text-lg px-2.5 py-2.5 whitespace-nowrap md:px-5">
            <Link
              href="/"
              font-bold
              text-base
              className={getLinkClassName("/")}
            >
              トレンド
            </Link>
          </li>
          <li className="font-bold text-lg px-2.5 py-2.5 whitespace-nowrap">
            <Link href="/tech" className={getLinkClassName("/tech")}>
              企業ブログ
            </Link>
          </li>

          <li className="font-bold text-lg px-2.5 py-2.5 whitespace-nowrap">
            <Link href="/keep" className={getLinkClassName("/keep")}>
              保存済み一覧
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
