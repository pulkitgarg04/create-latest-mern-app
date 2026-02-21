import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: () => {
        try {
            const user = JSON.parse(localStorage.getItem("authUser"));
            set({ authUser: user || null });
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: (data) => {
        set({ isSigningUp: true });
        try {
            const user = { name: data.name, email: data.email };

            const users = JSON.parse(localStorage.getItem("users") || "[]");
            if (users.find((u) => u.email === data.email)) {
                toast.error("Email already registered");
                return false;
            }
            users.push({ ...user, password: data.password });
            localStorage.setItem("users", JSON.stringify(users));

            localStorage.setItem("authUser", JSON.stringify(user));
            set({ authUser: user });
            toast.success("Account created successfully");
            return true;
        } catch {
            toast.error("Something went wrong");
            return false;
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: (data) => {
        set({ isLoggingIn: true });
        try {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find(
                (u) => u.email === data.email && u.password === data.password
            );
            if (!user) {
                toast.error("Invalid email or password");
                return false;
            }
            const authUser = { name: user.name, email: user.email };
            localStorage.setItem("authUser", JSON.stringify(authUser));
            set({ authUser });
            toast.success("Logged in successfully");
            return true;
        } catch {
            toast.error("Something went wrong");
            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: () => {
        localStorage.removeItem("authUser");
        set({ authUser: null });
        toast.success("Logged out successfully");
    },
}));
