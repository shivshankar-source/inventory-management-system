import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  Package,
  Layers,
  ShoppingBag,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    productsAddedToday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
     const res = await api.get("/dashboard");

console.log("Dashboard Response:", res.data);

setStats(res.data);

        // Optional
        // toast.success("Dashboard Loaded");
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data?.message ||
            "Failed to load dashboard"
        );
      }
    };

    fetchStats();
  }, []);

  return (
<>
  <Navbar />

  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
    
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-800">
        Inventory Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage products, categories and inventory insights.
      </p>
    </div>

    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl mb-8">
      <h2 className="text-3xl font-bold">
        Welcome Back 👋
      </h2>

      <p className="mt-2 text-blue-100">
        Here's a quick overview of your inventory system.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Total Products
            </p>

            <h2 className="text-5xl font-bold text-blue-600 mt-3">
              {stats.totalProducts}
            </h2>
          </div>

          <Package
            size={60}
            className="text-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Categories
            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-3">
              {stats.totalCategories}
            </h2>
          </div>

          <Layers
            size={60}
            className="text-green-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Added Today
            </p>

            <h2 className="text-5xl font-bold text-purple-600 mt-3">
              {stats.productsAddedToday}
            </h2>
          </div>

          <ShoppingBag
            size={60}
            className="text-purple-500"
          />
        </div>
      </div>

    </div>

    <div className="mt-10 bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        System Overview
      </h2>

      <p className="text-gray-600">
        This inventory management system helps track products,
        manage categories, monitor stock levels and analyze
        daily product activity.
      </p>
    </div>

  </div>
</>
  );
}

export default Dashboard;