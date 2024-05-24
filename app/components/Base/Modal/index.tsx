"use client";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, ReactNode } from "react";
import { MenuClose } from "../icon/MenuCLose";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  panelWidth?: string;
  type: "modal" | "dialog";
};

export const Modal: FC<Props> = ({
  open,
  onClose,
  children,
  title,
  panelWidth,
  type,
}) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-layoutColor bg-opacity-100" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center md:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={clsx(
                    "w-full overflow-hidden text-left align-middle shadow-xl transition-all md:rounded-md",
                    panelWidth ?? "md:max-w-[800px]"
                  )}
                >
                  <Dialog.Title
                    as="h3"
                    className={clsx(
                      "relative flex min-h-[57px] items-center p-4 font-bold text-white",
                      type === "modal"
                        ? "justify-center border-b-2 border-orange text-lg leading-none"
                        : "border-b border-gray-200 text-lg leading-normal bg-layoutColor"
                    )}
                  >
                    {title}
                    <MenuClose
                      className="absolute right-4 top-[18px] cursor-pointer p-0.5"
                      onClick={onClose}
                    />
                  </Dialog.Title>
                  <div className="p-4 text-gray-900 text-lg text-center">
                    <>
                      {children}
                      <Link
                        href="/login"
                        className="mt-4 inline-block font-bold text-lg text-blue-600"
                      >
                        ログイン
                      </Link>
                    </>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
