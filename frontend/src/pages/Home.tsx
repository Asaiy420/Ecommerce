import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";

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
    <main className="">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] [background-size:24px_24px] opacity-20" />

      {/* Theme toggle positioned at top-right */}
      <div className="absolute top-4 right-4 z-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 dark:from-white dark:to-slate-200 bg-clip-text text-transparent transition-all duration-300 mb-4">
            Find Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Musical Instrument
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
            Premium quality instruments for musicians of all levels.
            <br className="hidden sm:block" />
            Start your musical journey with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Now
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Catalog
            </motion.button>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12 transition-colors duration-300">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          className="mt-20 py-12 border-t border-slate-200 dark:border-slate-700 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                10K+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                500+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Premium Products
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                24/7
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Customer Support
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                Free
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Shipping & Returns
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
