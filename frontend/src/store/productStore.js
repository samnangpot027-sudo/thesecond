import { create } from "zustand";

const API = import.meta.env.VITE_API_URL;
// your backend URL

export const useProductStore = create((set, get) => ({
  product: [],
  loading: false,
  error: null,

  //   call product
  fetchProduct: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API);
      const data = await res.json();
      set({ product: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      // Reload data
      await get().fetchProduct();

      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  //   create product
  createProduct: async (payload) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      // Refresh product list
      await get().fetchProduct();

      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
      return { success: false, message: error.message };
    }
  },

  //   update product
  updateProduct: async (id, payload) => {
    set({ loading: true, error: null });

    if (!payload.name || payload.name.trim() === "") {
      const msg = "Please input name";
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }

    if (!payload.price || payload.price === "") {
      const msg = "Please input price";
      set({ loading: false, error: msg });
      return { success: false, message: msg };
    }

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update product");

      await get().fetchProduct(); // refresh list
      set({ loading: false });
      return { success: true }; // ✅ Must return success
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, message: err.message }; // ✅ Must return failure
    }
  },
}));
