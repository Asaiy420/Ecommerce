import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

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
  const containerClassName = "group/card transform-gpu";
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
    <CardContainer className={`w-full ${containerClassName}`}>
      <CardBody className="relative w-full h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-xl group-hover:shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-300">
        <CardItem
          translateZ="150"
          className="w-full h-60 mt-3 mx-3 overflow-hidden rounded-xl group-hover:shadow-xl"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-0" />
            <img
              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
              src={product.image}
              alt={product.name}
            />
          </div>
        </CardItem>
        <CardItem translateZ="50" className="mt-5 px-5">
          <h5 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-emerald-300 transition-all duration-300">
            {product.name}
          </h5>
        </CardItem>
        <CardItem translateZ="60" className="px-5">
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </p>
          </div>
        </CardItem>
        <CardItem translateZ="75" className="w-full px-5 pb-5">
          <Button
            className="w-full flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to Cart
          </Button>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
