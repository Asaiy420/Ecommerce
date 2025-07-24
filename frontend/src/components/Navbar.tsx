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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full shadow-sm transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-black   tracking-tight"
            style={{ letterSpacing: "-0.5px" }}
          >
            Mero Sangeet
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to={"/"}
              className="text-sm text-white hover:text-gray-800 font-medium transition-colors"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart size={18} />
                  <span className="hidden sm:inline">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      {cartItems.length}
                    </span>
                  )}
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="px-3 py-1.5 rounded text-white bg-gray-800 text-sm font-medium hover:bg-gray-700 transition-colors"
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
                  className="px-3 py-1.5 rounded text-white bg-red-600 text-sm font-medium hover:bg-red-700 transition-colors"
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
                    className="px-3 py-1.5 rounded text-white text-sm font-medium  hover:bg-gray-800 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <UserPlus size={16} />
                      <span className="hidden sm:inline">Sign Up</span>
                    </span>
                  </Link>
                  <Link
                    to={"/login"}
                    className="px-3 py-1.5 rounded text-white text-sm font-medium hover:bg-gray-800 transition-colors"
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
