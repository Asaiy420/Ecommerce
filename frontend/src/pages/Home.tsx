import CategoryItem from "../components/CategoryItem";

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
        <h1 className="text-center text-5xl sm:text-6xl font-bold mb-4">
          Explore The Instruments
        </h1>
        <p className="text-center text-xl text-white mb-12">
          Discover Your Music Vibe
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <CategoryItem
              category={category}
              key={category.name}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
