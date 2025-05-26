import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

const App = () => {

  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={ !user? <SignUp/>: <Navigate to="/" />} />
          <Route path="/login" element={ !user? <Login/>: <Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
};

export default App;
