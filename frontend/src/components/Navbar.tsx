import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import { ModeToggle } from "./mode-toggle";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cartItems } = useCartStore();

  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 w-full aurora-gradient bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border -b border-zinc-900">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold items-center space-x-2 flex"
          >
            Mero Sangeet
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to={"/"}
              className=" text-white hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-white hover:text-gray-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline mr-1 group-hover:text-gray-400 "
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5  text-xs group-hover:bg-gray-400 transition duration-300 ease-in-out">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                to={"/secret-dashboard"}
                className="aurora-gradient hover:bg-gray-400/20 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <Lock className="inline-block mr-1 " size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <Button
                className="aurora-gradient hover:bg-gray-400/20 text-white rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hiiden sm:inline">Logout</span>
              </Button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="aurora-gradient hover:bg-gray-400/20 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>

                <Link
                  to={"/login"}
                  className="aurora-gradient hover:bg-gray-400/20 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
                <ModeToggle />
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
