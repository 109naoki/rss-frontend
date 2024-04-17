"use client";

import { FC, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal } from "../../components/Base/Modal";
import { useAuthorizationHeaders } from "@/hooks/useAuthorizationHeaders";

type Props = {
  items: any;
  session: any;
};

export const View: FC<Props> = ({ session, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const header = useAuthorizationHeaders();

  return (
    <>
      <div className="container mx-auto px-4">
        <Modal
          open={isOpen}
          onClose={closeModal}
          title="ログインが必要です"
          type="modal"
        >
          <p className="text-center">
            以下のリンクからログインをしてください。
          </p>
        </Modal>
        <div className="flex flex-wrap -mx-2 mt-12">
          {/* TODO Any */}
          {items.data.map((item: any, index: number) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 block"
                >
                  {item.title && (
                    <p className="text-lg font-semibold mb-2">
                      {item.name > 40
                        ? item.name.substring(0, 40) + "..."
                        : item.name}
                    </p>
                  )}
                  {item.url && (
                    <img
                      src={item.url}
                      alt="記事の画像"
                      className="w-full mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString("ja-JP")}
                    </p>
                    {/* TODO 編集 */}
                    {header ? (
                      <BookmarkIcon
                        className="size-8 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      />
                    ) : (
                      <BookmarkIcon
                        className="size-8 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          openModal();
                        }}
                      />
                    )}
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
