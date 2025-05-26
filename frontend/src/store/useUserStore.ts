import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface SignupParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (params: SignupParams) => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({
    username,
    email,
    password,
    confirmPassword,
  }: SignupParams) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      set({ loading: false });
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },

  login: async ({ email, password }: LoginParams): Promise<void> => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
}));
