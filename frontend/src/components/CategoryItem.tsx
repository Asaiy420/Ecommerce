import { Link } from "react-router-dom";

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
    <Link
      to={"/category" + category.href}
      className="block h-[340px] w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      style={{ textDecoration: "none" }}
    >
      <div className="w-full h-3/5 relative">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col justify-between h-2/5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        <span className="inline-block text-sm text-blue-600 font-medium mt-auto">
          Explore {category.name} &rarr;
        </span>
      </div>
    </Link>
  );
};

export default CategoryItem;
