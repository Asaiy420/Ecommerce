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

interface UserStore {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (params: SignupParams) => Promise<void>;
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

    try {
      const res = await axiosInstance.post("/auth/sign-up", {
        username,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
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
