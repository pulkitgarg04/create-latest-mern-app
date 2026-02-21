import { create } from "zustand";
import { toast } from "react-hot-toast";

interface User {
    name: string;
    email: string;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface StoredUser extends User {
    password: string;
}

interface AuthStore {
    authUser: User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => void;
    signup: (data: SignupData) => boolean;
    login: (data: LoginData) => boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: () => {
        try {
            const user = JSON.parse(localStorage.getItem("authUser") || "null");
            set({ authUser: user || null });
        } catch {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: (data: SignupData) => {
        set({ isSigningUp: true });
        try {
            const user: User = { name: data.name, email: data.email };

            const users: StoredUser[] = JSON.parse(localStorage.getItem("users") || "[]");
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

    login: (data: LoginData) => {
        set({ isLoggingIn: true });
        try {
            const users: StoredUser[] = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find(
                (u) => u.email === data.email && u.password === data.password
            );
            if (!user) {
                toast.error("Invalid email or password");
                return false;
            }
            const authUser: User = { name: user.name, email: user.email };
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
