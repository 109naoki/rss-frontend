"use client";

import { Tech } from "@/type";

import { FC, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal } from "@/app/components/Base/Modal";

type Props = {
  tech: Tech;
  session: any;
};

export const View: FC<Props> = ({ tech, session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
          {tech.items.map((item, index) => (
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
                      {item.title.length > 40
                        ? item.title.substring(0, 40) + "..."
                        : item.title}
                    </p>
                  )}
                  {item.enclosure && item.enclosure.url && (
                    <img
                      src={item.enclosure.url}
                      alt="記事の画像"
                      className="w-full mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {new Date(item.isoDate).toLocaleDateString("ja-JP")}
                    </p>
                    {session?.user?.token ? (
                      <BookmarkIcon
                        className="size-8"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("クリックされました");
                        }}
                      />
                    ) : (
                      <BookmarkIcon
                        className="size-8"
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
