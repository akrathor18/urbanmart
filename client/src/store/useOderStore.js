import { create } from "zustand";
import api from "@/api/axios";
import { toast } from "react-toastify";
export const useOrderStore = create((set) => ({
  loading: false,
  error: null,
  orders: [],
  isPlacingOrder: false,
  loadingOrderDetail: false,
  orderDetailError: null,
  orderDetail: [],
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
     const res= await promise;
      set({ isPlacingOrder: false });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  getOders: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/orders");
      set({ orders: res, loading: false });
    } catch (error) {
      console.log(error);
      set({ error: error, loading: false });
    }
  },

  getOrderDetails: async (id) => {
    try {
      set({ loadingOrderDetail: true, orderDetailError: null });
      const orderDetail = await api.get(`/orders/${id}`);
      console.log(orderDetail);
      set({ orderDetail: orderDetail, loadingOrderDetail: false });
    } catch (error) {
      set({ loadingOrderDetail: false, orderDetailError: error });
      console.log(error);
    }
  },
}));
