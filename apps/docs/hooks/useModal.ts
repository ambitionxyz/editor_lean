import { create } from "zustand";

export type ModalType = "createPost";

interface ModalData {
  avartar: string;
  name: string;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {
    avartar:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-08.jpg",
    name: "Hôm nào cũng buồn",
  },
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
