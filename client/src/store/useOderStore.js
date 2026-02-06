import { create } from "zustand";
import api from "@/api/axios";
import { toast } from "react-toastify";
export const useOrderStore = create((set) => ({
  loading: false,
  error: null,
  orders: [],
  isPlacingOrder: false,

  placeOder: async (playload) => {
    set({ isPlacingOrder: true, error: null });
    const promise = api.post("/orders", playload);
    toast.promise(promise, {
      pending: "Placing oder",
      success: "Order Placed !",
      error: {
        render({ data }) {
          return data || "placing Order failed";
        },
      },
    });

    try {
      const res = await promise;
      console.log(res);
      set({ isPlacingOrder: false });
      return true;
    } catch (error) {
      console.log(error);
    }
  },

  getOders: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/orders");
      set({orders: res, loading: false,    })
    } catch (error) {
      console.log(error);
      set({ error: error, loading: false });
    }
  },
}));
