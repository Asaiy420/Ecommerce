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
      className="h-[400px] w-full"
      containerClassName="w-full group perspective-1000"
    >
      <Link
        to={"/category" + category.href}
        className="block h-full transform-gpu transition-all duration-500 hover:scale-[1.02]"
      >
        <div className="w-full h-full cursor-pointer relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20" />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-30 transform transition-all duration-500 group-hover:translate-y-[-12px]">
            <h3 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-lg">
              {category.name}
            </h3>
            <p className="flex items-center gap-2 text-lg font-medium text-emerald-400 group-hover:text-emerald-300 transition-all duration-300">
              Explore {category.name}
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </div>
        </div>
      </Link>
    </BackgroundGradient>
  );
};

export default CategoryItem;
