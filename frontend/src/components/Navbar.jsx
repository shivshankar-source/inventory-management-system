import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  LogOut,
  Boxes,
  User,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg">
            <Boxes
              size={38}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Inventory System
            </h1>

            <p className="text-xs text-blue-200">
              Product Management Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 ml-auto">

          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              location.pathname === "/dashboard"
                ? "bg-white text-blue-700 shadow-lg"
                : "text-white hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/products"
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
              location.pathname.includes("/products")
                ? "bg-white text-blue-700 shadow-lg"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Package size={18} />
            Products
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-3 bg-white/10 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
            <div className="bg-blue-600 p-2 rounded-full">
              <User
                size={16}
                className="text-white"
              />
            </div>

            <div className="hidden md:block">
              <p className="text-white text-sm font-semibold">
                {user?.fullName || "User"}
              </p>

              <p className="text-blue-200 text-xs">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition-all duration-300 shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;