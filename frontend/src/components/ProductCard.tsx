import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isFeatured: boolean;
  category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", {
        id: "login-toast",
      });
      return;
    }
    if (!product._id) {
      toast.error("Invalid product");
      return;
    }
    addToCart(product._id);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[400px]">
      <div className="w-full h-2/5 overflow-hidden rounded-t-xl">
        <img
          className="object-cover w-full h-full"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          <h5 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            {product.name}
          </h5>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[2.5em]">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <Button
            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
