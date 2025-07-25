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
  logout: () => Promise<void>;
  refreshToken: () => Promise<{ user: User }>;
}

// Initialize user from localStorage if available
const storedUser = localStorage.getItem("user");

const initialUser =
  storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

export const useUserStore = create<UserStore>((set) => ({
  user: initialUser,
  loading: false,
  checkingAuth: false,

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
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred when signing up");
      }
    }
  },

  login: async ({ email, password }: LoginParams): Promise<void> => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      console.log("Login response:", res.data);
      set({ user: res.data.user, loading: false });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred when logging in");
      }
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    console.log("Checking auth...");

    try {
      const response = await axiosInstance.get("/auth/profile");
      console.log("Auth check response:", response.data);
      set({ user: response.data, checkingAuth: false });
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log("Auth check error:", error);
      set({ checkingAuth: false, user: null });
      localStorage.removeItem("user");
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred when checking auth");
      }
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      localStorage.removeItem("user");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred when logging out");
      }
    }
  },

  refreshToken: async (): Promise<{ user: User }> => {
    try {
      const res = await axiosInstance.post("/auth/refresh-token");
      set({ user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      set({ user: null });
      localStorage.removeItem("user");
      throw error;
    }
  },
}));

// Axios interceptors

let refreshPromise: Promise<{ user: User }> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // if a refresh is already in progress wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // start the refresh
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null; // reset the promise

        return axiosInstance(originalRequest); // retry the request
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
