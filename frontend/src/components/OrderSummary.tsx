import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51RSBKEQEGSP7n933sFQGfeFnX13V4fld7QsK7wHw4J6zZGPwx7Z54jigfq1MQICtxmemBj65ZBCnV84mTAMEx1gy00sFOeoMjX"
);

const OrderSummary = () => {
  const { total, subTotal, coupon, isCouponApplied, cartItems } =
    useCartStore();

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axiosInstance.post("/payments/create-checkout-session", {
      products: cartItems,
      couponCode: coupon?.code,
    });
    const session = res.data;
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
    if (result?.error) {
      console.error(result.error);
    }
  };

  // Ensure values are numbers and handle NaN/undefined cases
  const safeSubTotal = Number(subTotal) || 0;
  const safeTotal = Number(total) || 0;
  const savings = safeSubTotal - safeTotal;

  // Format numbers with 2 decimal places
  const formattedSubTotal = safeSubTotal.toFixed(2);
  const formattedTotal = safeTotal.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-zinc-900 bg-transparent p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <p className="text-xl font-semibold text-white text-center ">
        Order Summary
      </p>

      <div className="space-y-4">
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-white">Original Price</dt>
          <dd className="text-base font-normal text-white">
            ${formattedSubTotal}
          </dd>
        </dl>

        {savings > 0 && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-white">Savings</dt>
            <dd className="text-base font-normal text-white">
              ${formattedSavings}
            </dd>
          </dl>
        )}

        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-white">
              Coupon ({coupon.code})
            </dt>
            <dd className="text-base font-normal text-white">
              {coupon.discountPercentage}%
            </dd>
          </dl>
        )}

        <dl className="flex items-center justify-between gap-4 border-t border-zinc-900">
          <dt className="text-base font-normal text-white">Total</dt>
          <dd className="text-base font-normal text-white">
            ${formattedTotal}
          </dd>
        </dl>
      </div>

      <motion.button
        className="flex w-full items-center justify-center rounded-lg cursor-pointer bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
      >
        Checkout
      </motion.button>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-white">or</span>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 dark:text-emerald-300 underline hover:text-emerald-300 dark:hover:text-emerald-400 hover:no-underline"
        >
          Continue Shopping
          <MoveRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
