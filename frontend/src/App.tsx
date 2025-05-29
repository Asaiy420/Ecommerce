import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import Admin from "./pages/Admin.tsx";
import Category from "./pages/Category.tsx";
import Cart from "./pages/Cart.tsx";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <div className="relative z-50 pt-20">
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

            <Route
              path="/category/:category"
              element={ <Category/>}
            />
            <Route path="/cart"  element={user ? <Cart/> : <Navigate to = "/login"/>} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;
