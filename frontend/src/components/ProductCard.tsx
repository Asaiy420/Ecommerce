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

    const {user} = useUserStore();
    const {addToCart} = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", {id: "login-toast"});
            return;
        }
        
        if (!product._id) {
            toast.error("Invalid product");
            return;
        }
        
        addToCart(product._id);
    }
    return (
      <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-zinc-950 shadow-lg">
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
            <img className="object-cover w-full" src={product.image} alt="product image"/>
        </div>
        <div className="mt-5 px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>
            <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span className="text-3xl font-bold text-emerald-300">${product.price}</span>
                </p>
            </div>
            <Button
                className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-150 ease-in-out" onClick={handleAddToCart}   
            >
                <ShoppingCart size={22} className="mr-2"/>
                Add to Cart
            </Button>
        </div>
      </div>
    )
  }
  
  export default ProductCard