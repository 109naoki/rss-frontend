"use client";
import { FC, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal } from "../components/Base/Modal";
import { createItem, deleteItem } from "@/lib/api";
import { AuthHeaders, Item, Zenn } from "@/type";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";

type Props = {
  zenn: Zenn;
  token: AuthHeaders;
  myItem: any;
};

export const View: FC<Props> = ({ zenn, token, myItem: initialItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [myItems, setMyItems] = useState(initialItem);
  const { data: session } = useSession();
  const isLoggedIn = session !== null;

  const isBookmarked = (link: string) =>
    myItems &&
    Array.isArray(myItems.data) &&
    myItems.data.some((item: Item) => item.link === link);

  const handleBookmark = async (item: Item) => {
    const itemData = {
      name: item.title,
      url: item.enclosure.url,
      link: item.link,
      date: item.isoDate,
    };

    try {
      const existingItem = myItems.data.find((i: Item) => i.link === item.link);

      if (existingItem) {
        await deleteItem(existingItem.ID, token);

        setMyItems((prevItems: any) => {
          const updatedItems = prevItems.data.filter(
            (i: Item) => i.link !== item.link
          );
          return { data: updatedItems };
        });
      } else {
        const response = await createItem(itemData, token);
        if (response) {
          const newItem = { ...itemData, ID: response.newId };
          setMyItems({ data: [...myItems.data, newItem] });
        }
      }
    } catch (error) {
      alert("削除に失敗しました");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Modal
          open={isOpen}
          onClose={closeModal}
          title="ブックマークへの追加"
          type="modal"
        >
          <p className="text-center">ログインが必要になります。</p>
        </Modal>
        <div className="flex flex-wrap -mx-2 mt-12">
          {!zenn.items.length
            ? Array.from(new Array(6)).map((_, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <Skeleton variant="rectangular" height={118} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </div>
              ))
            : zenn.items.map((item, index) => (
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
                        <p className="text-sm text-gray-600 font-bold">
                          {new Date(item.isoDate).toLocaleDateString("ja-JP")}
                        </p>
                        {isLoggedIn ? (
                          <BookmarkIcon
                            className={"size-8 cursor-pointer"}
                            onClick={(e) => {
                              e.preventDefault();
                              handleBookmark(item);
                            }}
                            sx={{
                              color: isBookmarked(item.link)
                                ? "red"
                                : "inherit",
                            }}
                          />
                        ) : (
                          <BookmarkIcon
                            className="size-8 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              openModal();
                            }}
                            sx={{
                              color: "inherit",
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
