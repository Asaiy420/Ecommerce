import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Admin from "./pages/Admin.tsx";
import Category from "./pages/Category.tsx";
import Cart from "./pages/Cart.tsx";
import { useCartStore } from "./store/useCartStore.tsx";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel.tsx";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white-200 text-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="top-0 flex flex-col items-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />

          <Route path="/category/:category" element={<Category />} />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
          />

          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancel /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
