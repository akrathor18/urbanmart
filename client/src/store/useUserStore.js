import api from "@/api/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { deepSanitizePayload } from "@/utils/sanitizePayload";
export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isupdating: false,
  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const user = await api.get("/user/");
      set({ user: user.user, loading: false });
    } catch (error) {
      console.log(error);
      set({ loading: false, error: error });
    }
  },

  updateProfile: async (data) => {
    set({ isupdating: true });
     const cleanData = deepSanitizePayload(data);
    console.log(cleanData);
    const promise = api.put("/user/", cleanData );
    toast.promise(promise, {
      pending: "Updating Profile",
      success: "Profile updated successfully!",
      error: {
        render({ data }) {
          return data || data?.message || "Update failed";
        },
      },
    });

    try {
      const response = await promise;
      console.log(response);
      set({ user: response.profile });

      set({ isupdating: false });
      return true;
    } catch (error) {
      console.log(error);
      set({ isupdating: false, error: error.response?.data || "Login failed" });
      return false;
    }
  },
}));
