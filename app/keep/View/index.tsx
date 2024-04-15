"use client";
import { Modal } from "@/app/components/Base/Modal";
import { FC, useEffect, useState } from "react";

type Props = {
  session: any;
};

export const View: FC<Props> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!session?.user?.token) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [session]);

  const closeModal = () => setIsOpen(false);

  return (
    <div className="container mx-auto px-4">
      <Modal
        open={isOpen}
        onClose={closeModal}
        title="ログインが必要です"
        type="modal"
      >
        <p className="text-center">以下のリンクからログインをしてください。</p>
      </Modal>
      {session?.user?.token ? <p>保存済み一覧</p> : null}
    </div>
  );
};
