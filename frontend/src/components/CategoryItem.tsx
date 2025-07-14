import { Link } from "react-router-dom";
import { BackgroundGradient } from "./ui/background-gradient";

interface Category {
  href: string;
  name: string;
  imageUrl: string;
}

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <BackgroundGradient
      className="h-96 w-full"
      containerClassName="w-full group"
    >
      <Link to={"/category" + category.href} className="block h-full">
        <div className="w-full h-full cursor-pointer relative rounded-3xl overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transform transition-transform duration-500 group-hover:translate-y-[-8px]">
            <h3 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">
              {category.name}
            </h3>
            <p className="text-white/80 text-lg group-hover:text-emerald-300 transition-colors">
              Explore {category.name}
            </p>
          </div>
        </div>
      </Link>
    </BackgroundGradient>
  );
};

export default CategoryItem;
