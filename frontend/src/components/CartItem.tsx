import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";

interface ProductDetails {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  id: string;
  quantity: number;
  image?: string;
  price?: number;
  name?: string;
  description?: string;
}

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/products/${item.id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [item.id]);

  // Use productDetails if available, otherwise fallback to item properties
  const displayName = productDetails?.name || item.name;
  const displayDescription = productDetails?.description || item.description;
  const displayPrice = productDetails?.price || item.price;
  const displayImage = productDetails?.image || item.image;

  return (
    <div className="rounded-xl border p-4 shadow-lg border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-emerald-500/10 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1 w-20 md:w-32 group">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-0" />
            <img
              className="h-20 md:h-32 object-cover w-full transform transition-transform duration-500 group-hover:scale-110"
              src={displayImage}
              alt={displayName}
            />
          </div>
        </div>
        <label className="sr-only">Choose quantity</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <Button
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer shadow-lg"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="text-white size-4" />
            </Button>

            <p className="min-w-[2rem] text-center font-medium text-white">
              {" "}
              {item.quantity}{" "}
            </p>

            <Button
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-emerald-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer shadow-lg"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="text-white size-4" />
            </Button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-emerald-400 dark:text-emerald-300">
              $
              {displayPrice
                ? (displayPrice * item.quantity).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-white dark:text-slate-100 hover:text-emerald-400 dark:hover:text-emerald-300 hover:underline cursor-pointer">
            {displayName}
          </p>
          <p className="text-sm text-white">{displayDescription}</p>

          <div className="flex items-center gap-4">
            <Button
              className="bg-red-500 text-white hover:bg-red-700 rounded px-2 py-1 transition cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
