import { motion } from "framer-motion";
import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
const PurchaseCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-zinc-950 rounded-lg shadow-xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 size-16 mb-4" />
          </div>
          <h1 className="text-2xl font-bold text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-white text-center mb-6">
            Your purchase was not completed. Please try again.
          </p>
          <div className="bg-zinc-950 rounded-lg p-4 mb-6">
            <p className="mb-6 text-white text-center">
              Your order has been cancelled.
            </p>
            <div className="bg-zinc-950 rounded-lg p-4 mb-6">
              <p className="text-sm text-white text-center">
                If you have any questions, please contact us at 
                <a
                  href="mailto:support@example.com"
                  className="text-emerald-500 hover:text-emerald-600"
                >
                   support@example.com
                </a>
              </p>
            </div>
            <div className="space-y-4">
              <Link
                to="/"
                className="w-full bg-zinc-950 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <ArrowLeft className="mr-2" size={18} />
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancel;
