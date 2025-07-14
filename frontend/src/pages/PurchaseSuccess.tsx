import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import axiosInstance from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId: string) => {
      try {
        await axiosInstance.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.error("Error in handleCheckoutSuccess", error);
      } finally {
        setIsProcessing(false);
      }
    };

    // Get the session ID from the URL
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("Session id has not been provided");
    }
  }, [clearCart]);

  if (isProcessing) return "Processing...";

  if (error) return `Error ${error}`;

  return (
    <div className="h-screen flex items-center justify-center px-4 ">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={400}
        recycle={false}
      />
      <div className="max-w-md w-full bg-zinc-950 rounded-lg shadow-xl overflow-hidden relative z-10  ">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 dark:text-emerald-300 size-16 mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-center text-emerald-500 dark:text-emerald-300 mb-2">
            Purchase Successful!
          </h1>
          <p className="text-white text-center mb-2">
            Thank you for your order. {"We're"} processing your payment.
          </p>
          <p className="text-white text-center text-sm mb-6">
            Please check your email for order details and updates
          </p>
          <div className="bg-zinc-950 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Estimated Delivery</span>
              <span className="text-sm text-white font-semibold">
                2-3 business days
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              Thanks for your purchase!
            </Button>
            <Link
              to={"/"}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-emerald-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center cursor-pointer"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
