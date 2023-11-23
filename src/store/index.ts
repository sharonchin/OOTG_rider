"use client";

import { FilteredRider } from "@/lib/validations/types";
import { create } from "zustand";

type Store = {
  authUser: FilteredRider | null;
  requestLoading: boolean;
  setAuthUser: (rider: FilteredRider | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (rider) => set((state) => ({ ...state, authUser: rider })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
}));

export default useStore;
