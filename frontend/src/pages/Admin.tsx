import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../store/useProductStore";
import { cn } from "../lib/utils"; // If you have a classnames utility, otherwise use classnames or clsx

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
      <div className="min-h-full bg-black text-white relative overflow-hidden">
        {/* Abstract blurred background shapes */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none ">
          <div className="absolute w-96 h-96 bg-emerald-500 opacity-30 rounded-full blur-3xl -top-24 -left-24"></div>
          <div className="absolute w-80 h-80 bg-teal-400 opacity-20 rounded-full blur-2xl top-1/2 left-2/3"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          {/* Glassmorphic Card */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl font-extrabold mb-10 text-center drop-shadow-lg"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Admin Dashboard
            </motion.h1>
            {/* Tab Buttons */}
            <div className="flex justify-center mb-10 gap-4">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-md hover:scale-105 focus:outline-none",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/30"
                      : "bg-slate-800/60 text-slate-200 hover:bg-slate-700/70 hover:text-white"
                  )}
                  style={{
                    boxShadow:
                      activeTab === tab.id
                        ? "0 4px 24px 0 rgba(16, 185, 129, 0.25)"
                        : undefined,
                  }}
                >
                  <span
                    className={cn(
                      "p-2 rounded-full transition-all",
                      activeTab === tab.id ? "bg-white/20" : "bg-slate-700/40"
                    )}
                  >
                    <tab.icon className="size-5" />
                  </span>
                  {tab.label}
                </Button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "create" && <CreateProductForm />}
              {activeTab === "products" && <ProductsList />}
              {activeTab === "analytics" && <AnalyticsTab />}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Admin;
