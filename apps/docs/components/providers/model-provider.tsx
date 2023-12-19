"use client";

import { useEffect, useState } from "react";
import AddPostModal from "../modal/add-post-modal";
import { useModal } from "../../hooks/useModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "createPost";
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{isModalOpen && <AddPostModal />}</>;
};
