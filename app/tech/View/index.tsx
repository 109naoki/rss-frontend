"use client";

import { Tech } from "@/type";
import { FC } from "react";
type Props = {
  tech: Tech;
};

export const View: FC<Props> = ({ tech }) => {
  return (
    <>
      <div className="container mx-auto px-4 mb-10">
        <h1 className="text-2xl font-bold mb-8 text-center">企業のフィード</h1>
        <div className="flex flex-wrap -mx-2">
          {tech.items.map((item, index: number) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
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
                      className="w-full mb-4"
                    />
                  )}
                  <p className="text-sm text-gray-600">{item.isoDate}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
