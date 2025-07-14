import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cartItems } = useCartStore();
  const isAdmin = user?.role === "admin";

  // Add scroll animation
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky  h-0 left-0 w-full z-20 transition-all duration-300 ${
        isScrolled
          ? "glass-effect shadow-lg backdrop-blur-lg bg-white/70 dark:bg-gray-900/80"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px- py-auto ">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-2xl">🎵</span> Mero Sangeet
          </Link>

          <nav className="flex flex-wrap items-center gap-6">
            <Link
              to={"/"}
              className="relative text-sm text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-all duration-300 group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-sm text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart
                    className="transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />
                  <span className="hidden sm:inline">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </span>
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="relative group px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  <Lock size={16} />
                  <span className="hidden sm:inline">Dashboard</span>
                </span>
              </Link>
            )}

            <div className="flex items-center gap-3">
              {user ? (
                <Button
                  onClick={logout}
                  className="relative group px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                </Button>
              ) : (
                <>
                  <Link
                    to={"/signup"}
                    className="relative group px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    <span className="flex items-center gap-1.5">
                      <UserPlus size={16} />
                      <span className="hidden sm:inline">Sign Up</span>
                    </span>
                  </Link>

                  <Link
                    to={"/login"}
                    className="relative group px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      <LogIn size={18} />
                      <span className="hidden sm:inline">Login</span>
                    </span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
