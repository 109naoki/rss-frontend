"use client";
import { FC, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Modal } from "../../components/Base/Modal";
import { AuthHeaders } from "@/type";
import { useSession } from "next-auth/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteItem } from "@/lib/api";
import toast from "react-hot-toast";

type Props = {
  items: any;
  token: AuthHeaders;
};

export const View: FC<Props> = ({ token, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [myItems, setMyItems] = useState(items);
  const { data: session } = useSession();
  const isLoggedIn = session !== null;

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id, token);

      setMyItems((prevItems: any) => {
        const updatedItems = prevItems.data.filter(
          (item: any) => item.ID !== id
        );
        return { ...prevItems, data: updatedItems };
      });
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <Modal
          open={isOpen}
          onClose={closeModal}
          title="ブックマークの閲覧"
          type="modal"
        >
          <p className="text-center">
            以下のリンクからログインをしてください。
          </p>
        </Modal>
        <div className="flex flex-wrap -mx-2 mt-12">
          {myItems.data.map((item: any, index: number) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-105">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 block"
                >
                  {item.name && (
                    <p className="text-lg font-semibold mb-2">
                      {item.name.length > 40
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
                    <p className="text-sm text-gray-600 font-bold">
                      {new Date(item.date).toLocaleDateString("ja-JP")}
                    </p>
                    {isLoggedIn ? (
                      <DeleteForeverIcon
                        className="size-8 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(item.ID);
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
