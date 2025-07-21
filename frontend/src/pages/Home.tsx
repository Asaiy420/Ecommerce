import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    { href: "/guitar", name: "Guitar", imageUrl: "/jeans.jpg" },
    { href: "/ukelele", name: "Ukulele", imageUrl: "/tshirts.jpg" },
    { href: "/e-guitar", name: "Electric Guitar", imageUrl: "/shoes.jpg" },
    { href: "/guitar-picks", name: "Guitar Picks", imageUrl: "/glasses.png" },
    { href: "/guitar-bag", name: "Guitar Bag", imageUrl: "/jackets.jpg" },
    { href: "/guitar-belt", name: "Guitar Belt", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <main className="bg-neutral-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
            Find Your Perfect
            <span className="block mt-2 text-blue-600 pb-2">
              Musical Instrument
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto pt-10">
            Premium quality instruments for musicians of all levels.
            <br className="hidden sm:block" />
            Start your musical journey with confidence.
          </p>
        </motion.div>
        {/* Categories Grid */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + index * 0.05,
                  duration: 0.4,
                  ease: [0.25, 0.25, 0, 1],
                }}
              >
                <CategoryItem category={category} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Trust Indicators */}
        <motion.div
          className="mt-20 py-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Explore
              </div>
              <div className="text-sm text-gray-600">
                <Link to="/cart">Cart</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
