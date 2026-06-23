import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import {
  User,
  Mail,
  Lock,
  Boxes,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex justify-center items-center p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Boxes
              className="text-white"
              size={30}
            />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-300 mt-2">
            Join Inventory System
          </p>
        </div>

        <div className="relative mb-4">
          <User
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white text-gray-700 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="relative mb-4">
          <Mail
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white text-gray-700 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div className="relative mb-5">
          <Lock
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 p-3 rounded-xl bg-white text-gray-700 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition duration-300"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p className="text-center text-gray-300 mt-5">
          Already have an account?
        </p>

        <Link
          to="/"
          className="block text-center text-blue-300 font-semibold mt-2 hover:text-white transition"
        >
          Login
        </Link>
      </form>
    </div>
  );
}

export default Register;