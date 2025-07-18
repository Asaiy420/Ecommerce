import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    if (!coupon) return;
    await removeCoupon();
    setUserInputCode("");
  };
  return (
    <motion.div
      className="space-y-4 rounded-lg border border-zinc-900 aurora-gradient p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-white text-center"
          >
            Do you have a voucher or gift card
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg border border-zinc-900 bg-transparent p-2.5  text-sm text-white placeholder:text-white placeholder:text-sm placeholder:leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center "
            placeholder="Enter code here"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            required
          />
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg cursor-pointer bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>

      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-white">Applied Coupon</h3>
          <p className="mt-2 text-sm text-white">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            className="flex w-full items-center justify-center rounded-lg cursor-pointer bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-white">
            Your available coupons:
          </h3>
          <p className="mt-2 text-sm text-white">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
