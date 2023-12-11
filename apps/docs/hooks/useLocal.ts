import { Mutate, StoreApi, create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ILocalStore {
  dataStore: any;
  addLocal: (data: any) => void;
}

export const useLocal = create<ILocalStore>()(
  persist(
    (set, get) => ({
      dataStore: {},
      addLocal: (data: any) => set({ dataStore: data }),
    }),
    {
      name: "editorData",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
