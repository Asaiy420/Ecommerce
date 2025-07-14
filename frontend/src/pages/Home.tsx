import CategoryItem from "../components/CategoryItem";
import { motion } from "framer-motion";

const Home = () => {
  const categories = [
    { href: "/guitar", name: "Guitar", imageUrl: "/jeans.jpg" },
    { href: "/ukelele", name: "Ukelele", imageUrl: "/tshirts.jpg" },
    { href: "/e-guitar", name: "Electric Guitar", imageUrl: "/shoes.jpg" },
    { href: "/guitar-picks", name: "Guitar Picks", imageUrl: "/glasses.png" },
    { href: "/guitar-bag", name: "Guitar Bag", imageUrl: "/jackets.jpg" },
    { href: "/guitar-belt", name: "Guitar Belt", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 aurora-gradient opacity-30"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h1
          className="text-center text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-emerald-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore The Instruments
        </motion.h1>
        <motion.p
          className="text-center text-xl text-white/80 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover Your Music Vibe
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <CategoryItem category={category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
