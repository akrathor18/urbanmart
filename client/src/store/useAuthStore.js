import { create } from "zustand";
import api from "@/api/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  user: null,
  status: "idle", // idle | loading | authenticated | guest
  isSigning: false,
  signIn: async (data) => {
    set({ isSigning: true });
    const promise = api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
    toast.promise(promise, {
      pending: "Sign-in...",
      success: "Sing-in successfully!",
      error: {
        render({ data }) {
          return data  || "Login failed";
        },
      },
    });

    try {
      const response = await promise;
      set({ isSigning: false });
      return true;
    } catch (error) {
      set({ isSigning: false, error: error.response?.message || "Login failed" });
      return false;
    }
  },

  signUp: async (data) => {
    set({ isSigning: true });
    const promise = api.post("/auth/register", {
      email: data.email,
      password: data.password,
        firstName: data.firstName,
      lastName: data.lastName,
    });

    toast.promise(promise, {
      pending: "SignUp...",
      success: "Sign-Up successfully!",
      error: {
        render({ data }) {
          return data|| "Failed to Sing-Up";
        },
      },
    });

    try {
      const response = await promise;
      set({ isSigning: false });
      return true;
    } catch (error) {
      set({ isSigning: false, error: error.response?.data || "SingUp Failed" });
      return false;
    }
  },

  logout: () => {
    set({ user: null, status: "guest" });
  },
}));
