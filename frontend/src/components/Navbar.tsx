import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cartItems } = useCartStore();

  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-900 dark:text-white items-center space-x-2 flex transition-colors duration-300"
          >
            Mero Sangeet
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className="text-slate-700 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-slate-700 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline mr-1 group-hover:text-gray-400 dark:group-hover:text-slate-400"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-red-500 dark:bg-blue-700 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-gray-400 dark:group-hover:bg-slate-600 transition duration-300 ease-in-out">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1 dark:text-white" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <Button
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} className="dark:text-white" />
                <span className="hidden sm:inline ml-1">Logout</span>
              </Button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <UserPlus className="mr-2 dark:text-white" size={18} />
                  Sign Up
                </Link>

                <Link
                  to={"/login"}
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <LogIn className="mr-2 dark:text-white" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
