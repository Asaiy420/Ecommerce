import { useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { fetchProductByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductByCategory(category!);
  }, [fetchProductByCategory, category]);

  console.log("Products", products);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category!.charAt(0).toUpperCase() + category?.slice(1)}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-red-400 dark:text-red-300 text-center col-span-full">
              No Products Found
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Category;
