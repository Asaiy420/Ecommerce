import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Cartitem {
  id: string;
  quantity: number;
}

interface Coupon {
  code: string;
  discountPercentage: number;
}

interface CartStore {
  cartItems: Cartitem[];
  coupon: Coupon | null;
  total: number;
  subTotal: number;
  loading: boolean;
  getCartItems: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  calculateTotals: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  coupon: null,
  total: 0,
  subTotal: 0,
  loading: false,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/cart");
      set({ cartItems: res.data, loading: false });
      get().calculateTotals();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
        set({ loading: false });
      } else {
        toast.error("An unexpected error occurred when fetching cart items");
        set({ loading: false });
      }
    }
  },

  addToCart: async (productId: string) => {
    set({ loading: true });

    try {
      await axiosInstance.post("/cart", { productId });
      toast.success("Product added to cart", {
        id: `cart-success-${productId}`,
        
      });

      set((prevState) => {
        const existingItem = prevState.cartItems.find(
          (item) => item.id === productId
        );
        const newCart = existingItem
          ? prevState.cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cartItems, { id: productId, quantity: 1 }];
        return { ...prevState, cartItems: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occured");
        set({ loading: false });
      } else {
        toast.error("An unexpected error occured when adding to cart");
        set({ loading: false });
      }
    }
  },

  calculateTotals: async () => {
    const { cartItems, coupon } = get();

    try {
      // Fetch all product details for items in cart
      const productDetails = await Promise.all(
        cartItems.map((item) => axiosInstance.get(`/products/${item.id}`))
      );

      const subTotal = cartItems.reduce((sum, item, index) => {
        const productPrice = productDetails[index].data.price;
        return sum + productPrice * item.quantity;
      }, 0);

      let total = subTotal; // Default to subTotal if no coupon is applied

      if (coupon) {
        const discount = (subTotal * coupon.discountPercentage) / 100;
        total = subTotal - discount;
      }

      set({ subTotal, total });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Error calculating totals"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  },
}));
