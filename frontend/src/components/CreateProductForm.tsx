import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useProductStore } from "../store/useProductStore";
const categories = [
  "guitar",
  "electric-guitar",
  "ukelele",
  "guitar-picks",
  "guitar-bag",
  "guitar-belt",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct(newProduct);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };

      reader.readAsDataURL(file); // base64 string
    }
  };

  return (
    <motion.div
      className="bg-transparent shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto "
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* PRODUCT NAME FORM */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-slate-900/50 border border-slate-700/50 rounded-lg shadow-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            required
          />
        </div>
        {/* DESCRIPTION FORM */}
        <div>
          <label
            htmlFor="description"
            className=" block text-sm font-medium text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-slate-900/50 border border-slate-700/50 rounded-lg shadow-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            required
          />
        </div>

        {/* PRICE FORM */}
        <div>
          <label
            htmlFor="price"
            className=" mt-2 block text-sm font-medium text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
              })
            }
            step="0.01"
            className="mt-1 block w-full bg-slate-900/50 border border-slate-700/50 rounded-lg shadow-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            required
          />
        </div>

        {/* CATEGORY FORM */}
        <div>
          <label
            htmlFor="category"
            className=" mt-2 block text-sm font-medium text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-slate-900/50 border border-slate-700/50 rounded-lg shadow-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/* IMAGE FORM */}
        <div className="mt-1 flex items-center justify-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="mt-2 cursor-pointer inline-flex items-center bg-gradient-to-r from-slate-800 to-slate-700 hover:from-emerald-600 hover:to-emerald-500 py-3 px-4 rounded-lg shadow-lg text-sm font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <Upload className="size-5 inline-block mr-2 group-hover:scale-110 transition-transform duration-300" />
            Upload Image
          </label>
          {newProduct.image && (
            <span className="ml-3 text-sm text-white">Image uploaded ✅ </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50 mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="mr-2 size-5 animate-spin" aria-hidden="true" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 size-5" />
              Create Product
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
