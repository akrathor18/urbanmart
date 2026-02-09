import { create } from "zustand";
import api from "@/api/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
  user: null,
  status: "loading", // idle | loading | authenticated | guest
  isSigning: false,

  checkAuth: async () => {
    const { status } = get();
    if (status !== "loading") set({ status: "loading" });

    try {
      const res = await api.get("/auth/me");
      set({
        user: res.user,
        status: "authenticated",
      });
    } catch (error) {
      set({
        user: null,
        status: "guest",
      });
    }
  },

  //  Login
  signIn: async (data) => {
    set({ isSigning: true });

    const promise = api.post("/auth/login", {
      email: data.email,
      password: data.password,
    });

    toast.promise(promise, {
      pending: "Signing in...",
      success: "Signed in successfully!",
      error: {
        render({ data }) {
          return data || "Login failed";
        },
      },
    });

    try {
      await promise;

      //  confirm auth via backend
      await get().checkAuth();

      set({ isSigning: false });
      return true;
    } catch (error) {
      set({ isSigning: false });
      return false;
    }
  },

  // Register
  signUp: async (data) => {
    set({ isSigning: true });

    const promise = api.post("/auth/register", {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    toast.promise(promise, {
      pending: "Signing up...",
      success: "Account created successfully!",
      error: {
        render({ data }) {
          return data?.response?.data?.message || "Signup failed";
        },
      },
    });

    try {
      await promise;

      // 🔥 confirm auth via backend
      await get().checkAuth();

      set({ isSigning: false });
      return true;
    } catch (error) {
      set({ isSigning: false });
      return false;
    }
  },

  // 🚪 Logout
 logout: async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // ignore
  }

  // 🔥 clear client state
  const { clearCart } = (await import("@/store/useCartStore")).useCartStore.getState();
  const { clearWishlist } = (await import("@/store/useWishlistStore")).useWishlistStore.getState();

  clearCart();
  clearWishlist();

  localStorage.removeItem("cart-storage");
  localStorage.removeItem("wishlist-storage");

  set({
    user: null,
    status: "guest",
  });
},

}));
