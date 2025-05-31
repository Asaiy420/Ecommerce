import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface Cartitem {
  id: string;
  quantity: number;
  price?: number;
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
  isCouponApplied: boolean;
  getCartItems: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  calculateTotals: () => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  coupon: null,
  total: 0,
  subTotal: 0,
  loading: false,
  isCouponApplied: false,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/cart");
      const validCartItems = res.data.filter(
        (item: Cartitem) => item.id && item.quantity > 0
      );
      set({ cartItems: validCartItems, loading: false });
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
      // First add to cart
      await axiosInstance.post("/cart", { productId });

      // Then fetch updated cart items to get complete product details
      const res = await axiosInstance.get("/cart");
      const validCartItems = res.data.filter(
        (item: Cartitem) => item.id && item.quantity > 0
      );

      set({ cartItems: validCartItems, loading: false });
      get().calculateTotals();

      toast.success("Product added to cart", {
        id: `cart-success-${productId}`,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred when adding to cart");
      }
      set({ loading: false });
    }
  },

  calculateTotals: async () => {
    const { cartItems, coupon } = get();

    try {
      // Add validation to filter out invalid items
      const validCartItems = cartItems.filter(
        (item) => item.id && item.id !== "undefined" && item.quantity > 0
      );

      console.log("Valid Cart Items:", validCartItems);

      if (validCartItems.length === 0) {
        set({ subTotal: 0, total: 0 });
        console.log("Cart is empty, totals set to 0.");
        return;
      }

      // Fetch all product details for items in cart
      const productDetailsPromises = validCartItems.map((item) =>
        axiosInstance.get(`/products/${item.id}`).catch((error) => {
          console.error(`Failed to fetch product ${item.id}:`, error);
          return null;
        })
      );

      const productDetailsResults = await Promise.all(productDetailsPromises);

      console.log("Product Details Results:", productDetailsResults);

      // Filter out failed requests and calculate totals only for successful ones
      const subTotal = validCartItems.reduce((sum, item, index) => {
        let itemPrice = 0;

        // Prioritize using the price already available in the cart item if it's a valid number
        if (typeof item.price === "number" && !isNaN(item.price)) {
          itemPrice = item.price;
          console.log(`Using item.price for item ${item.id}: ${itemPrice}`);
        } else {
          // If item.price is not available or not a valid number, fetch product details
          const productDetails = productDetailsResults[index];
          if (!productDetails) {
            console.log(
              `Skipping item ${item.id} due to failed product details fetch.`
            );
            return sum;
          }

          const fetchedPrice = productDetails.data.price;
          // Check if fetchedPrice is a valid number, otherwise default to 0
          itemPrice =
            typeof fetchedPrice === "number" && !isNaN(fetchedPrice)
              ? fetchedPrice
              : 0;
          console.log(`Using fetched price for item ${item.id}: ${itemPrice}`);
        }

        console.log(
          `Item ${item.id}: Calculated Price = ${itemPrice}, Quantity = ${item.quantity}`
        );
        return sum + itemPrice * item.quantity;
      }, 0);

      let total = subTotal;

      if (coupon && get().isCouponApplied) {
        const discount = (subTotal * coupon.discountPercentage) / 100;
        total = subTotal - discount;
        console.log(
          `Coupon applied: discount = ${discount}, new total = ${total}`
        );
      }

      console.log("Calculated SubTotal:", subTotal);
      console.log("Calculated Total:", total);

      set({ subTotal, total });
    } catch (error) {
      console.error("Error calculating totals:", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Error calculating totals"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
      // Don't reset totals on error, keep previous values
    }
  },

  updateQuantity: async (productId: string, quantity: number) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }
    await axiosInstance.put(`/cart/${productId}`, { quantity });

    set((prevState) => ({
      cartItems: prevState.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));

    get().calculateTotals();
  },

  removeFromCart: async (productId: string) => {
    if (!productId) {
      toast.error("Invalid product ID");
      return;
    }

    set({ loading: true });
    try {
      await axiosInstance.delete(`/cart`, {
        data: { productId },
      });

      set((prevState) => ({
        cartItems: prevState.cartItems.filter((item) => item.id !== productId),
      }));

      get().calculateTotals();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.error || "Error removing item from cart"
        );
      } else {
        toast.error("An unexpected error occurred when removing from cart");
      }
    } finally {
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ cartItems: [], coupon: null, total: 0, subTotal: 0 });
  },
}));
