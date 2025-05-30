import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useProductStore } from "../store/useProductStore";
const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
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
    setNewProduct({ name: "", description: "", price: 0, category: "", image: "" });
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
      className="bg-black shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto "
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
            className="mt-1 block w-full bg-zinc-950 border border-zinc-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-out"
            required
          />
        </div>
        {/* DESCRIPTION FORM */}
        <div>
          <label
            htmlFor="description"
            className=" mt-2 block text-sm font-medium text-white"
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
            className="mt-1 block w-full bg-zinc-950 border border-zinc-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-out"
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
            className="mt-1 block w-full bg-zinc-950 border border-zinc-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-out"
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
            className="mt-1 block w-full bg-zinc-950 border border-zinc-900 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 ease-out"
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
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className=" mt-2 cursor-pointer bg-zinc-950 py-2 px-3 border border-zinc-900 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-500"
          >
            <Upload className="size-5 inline-block mr-2" />
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
