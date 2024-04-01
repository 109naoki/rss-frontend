"use client";

import { Tech } from "@/type";

import { FC, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal } from "@/app/components/Base/Modal";
type Props = {
  tech: Tech;
};

export const View: FC<Props> = ({ tech }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean[]>(
    new Array(tech.items.length).fill(false)
  );
  const toggleBookmark = (index: number) => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="ブックマーク"
          type="modal"
        >
          <p>この記事をブックマークしますか？</p>
        </Modal>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">企業のフィード</h1>
        <div className="flex flex-wrap -mx-2">
          {tech.items.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600">{item.isoDate}</p>
                    <BookmarkIcon
                      className={`ml-2 cursor-pointer ${
                        bookmarked[index] ? "text-red-500" : "text-gray-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(index);
                      }}
                    />
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
