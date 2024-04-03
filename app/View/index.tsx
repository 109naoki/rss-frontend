"use client";
import { Zenn } from "@/type";
import { FC } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";

type Props = {
  zenn: Zenn;
};

export const View: FC<Props> = ({ zenn }) => {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-2 mt-12">
          {zenn.items.map((item, index) => (
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
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {new Date(item.isoDate).toLocaleDateString("ja-JP")}
                    </p>
                    <BookmarkIcon
                      onClick={(e) => {
                        e.preventDefault();
                        alert("クリックされました");
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
