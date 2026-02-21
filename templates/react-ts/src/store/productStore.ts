import { create } from "zustand";
import { toast } from "react-hot-toast";

interface Product {
    _id: string;
    name: string;
    price: number | string;
    image: string;
    createdAt?: string;
}

interface ProductStore {
    products: Product[];
    loading: boolean;
    fetchProducts: () => void;
    createProduct: (productData: { name: string; price: string; image: string }) => void;
    deleteProduct: (id: string) => void;
}

const getStoredProducts = (): Product[] => {
    try {
        return JSON.parse(localStorage.getItem("products") || "[]");
    } catch {
        return [];
    }
};

const saveProducts = (products: Product[]): void => {
    localStorage.setItem("products", JSON.stringify(products));
};

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,

    fetchProducts: () => {
        set({ loading: true });
        const products = getStoredProducts();
        set({ products, loading: false });
    },

    createProduct: (productData) => {
        set({ loading: true });
        const product: Product = {
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
