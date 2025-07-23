import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";

const brands = [
  { name: "Fender" },
  { name: "Gibson" },
  { name: "PRS Guitars" },
  { name: "Roland" },
  { name: "Marshall" },
  { name: "Yamaha" },
];

const categories = [
  { href: "/guitar", name: "Guitar", imageUrl: "/jeans.jpg" },
  { href: "/ukelele", name: "Ukulele", imageUrl: "/tshirts.jpg" },
  { href: "/e-guitar", name: "Electric Guitar", imageUrl: "/shoes.jpg" },
  { href: "/guitar-picks", name: "Guitar Picks", imageUrl: "/glasses.png" },
  { href: "/guitar-bag", name: "Guitar Bag", imageUrl: "/jackets.jpg" },
  { href: "/guitar-belt", name: "Guitar Belt", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const featuredProducts = [
  {
    _id: "1",
    name: "Fender American Ultra II Stratocaster",
    description: "A premium electric guitar for professionals.",
    price: 1999,
    image: "/shoes.jpg",
    isFeatured: true,
    category: "Electric Guitar",
  },
  {
    _id: "2",
    name: "Gibson Les Paul Standard",
    description: "Classic tone and style for any genre.",
    price: 2499,
    image: "/jackets.jpg",
    isFeatured: true,
    category: "Electric Guitar",
  },
  {
    _id: "3",
    name: "Yamaha Pacifica 112V",
    description: "Versatile and affordable for all players.",
    price: 399,
    image: "/jeans.jpg",
    isFeatured: true,
    category: "Electric Guitar",
  },
];

const Home = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              Fender American Ultra II <br /> Stratocaster
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-xl">
              Experience next-level performance and tone with the iconic
              Stratocaster. Perfect for stage and studio.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded shadow"
              size="lg"
            >
              Shop Now
            </Button>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="/shoes.jpg"
              alt="Fender American Ultra II Stratocaster"
              className="w-[340px] h-[340px] object-contain drop-shadow-2xl bg-white rounded-xl"
            />
          </div>
        </section>
        {/* Top Brands */}
        <section className="py-6">
          <div className="flex flex-wrap justify-center items-center gap-8 border-y border-gray-200 py-6">
            {brands.map((brand) => (
              <span
                key={brand.name}
                className="text-lg font-semibold text-gray-700 opacity-80"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </section>
        {/* Shop by Categories */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Shop by Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              >
                <CategoryItem category={category} />
              </motion.div>
            ))}
          </div>
        </section>
        {/* Featured Guitars */}
        <section className="mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Featured Guitars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.07, duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
