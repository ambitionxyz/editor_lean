import { create } from "zustand";

interface DataStore {
  data: any;
  onChangeData: (data: any) => void;
}

export const useData = create<DataStore>((set) => ({
  data: [],
  onChangeData: (data) => set({ data: data }),
}));
