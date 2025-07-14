import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { Button } from "./ui/button";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="bg-transparent shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto border border-zinc-950"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-zinc-800">
        <thead className="bg-transparent">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-transparent divide-y divide-zinc-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-zinc-800">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 size-10">
                    <img
                      className="size-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.image}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">
                  ${product.price.toFixed(2)}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{product.category}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-emerald-400 text-zinc-900"
                      : "bg-zinc-800 text-white"
                  } hover:bg-emerald-500 transition-colors duration-300`}
                >
                  <Star className="size-5" />
                </Button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  onClick={() => deleteProduct(product._id)}
                   className="bg-red-500 text-white hover:bg-red-700 rounded px-2 py-1 transition"  
                >
                  <Trash className="size-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
