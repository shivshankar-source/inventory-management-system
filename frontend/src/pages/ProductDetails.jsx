import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct(res.data.product);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center mt-10">
          <h2 className="text-xl font-semibold">
            Loading...
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">
            Product Details
          </h1>
<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div>
              <p className="text-gray-500">
                Product Name
              </p>
              <p className="font-semibold text-lg">
                {product.productName}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Category
              </p>
              <p className="font-semibold text-lg">
                {product.category}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Price
              </p>
              <p className="font-semibold text-lg">
                ₹{product.price}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Quantity
              </p>
              <p className="font-semibold text-lg">
                {product.quantity}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Status
              </p>

             <span
  className={`px-3 py-1 rounded-full text-white ${
    product.status === "Active"
      ? "bg-green-500"
      : "bg-red-500"
  }`}
>
  {product.status}
</span>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">
                Description
              </p>
              <p className="font-medium">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;