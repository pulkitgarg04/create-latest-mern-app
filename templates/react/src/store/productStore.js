import { create } from "zustand";
import { toast } from "react-hot-toast";

const getStoredProducts = () => {
    try {
        return JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
        return [];
    }
};

const saveProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
};

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    fetchProducts: () => {
        set({ loading: true });
        const products = getStoredProducts();
        set({ products, loading: false });
    },

    createProduct: (productData) => {
        set({ loading: true });
        const product = {
            _id: Date.now().toString(),
            ...productData,
            createdAt: new Date().toISOString(),
        };
        const products = [...getStoredProducts(), product];
        saveProducts(products);
        set((state) => ({ products: [...state.products, product], loading: false }));
        toast.success("Product created successfully");
    },

    deleteProduct: (id) => {
        set({ loading: true });
        const products = getStoredProducts().filter((p) => p._id !== id);
        saveProducts(products);
        set((state) => ({
            products: state.products.filter((p) => p._id !== id),
            loading: false,
        }));
        toast.success("Product deleted successfully");
    },
}));
