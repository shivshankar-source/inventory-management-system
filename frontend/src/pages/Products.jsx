import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

function Products() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [status, setStatus] = useState("");
const [sort, setSort] = useState("asc");
const [page, setPage] = useState(1);


const [searchInput, setSearchInput] = useState("");
const [categoryInput, setCategoryInput] = useState("");
const [statusInput, setStatusInput] = useState("");
const [sortInput, setSortInput] = useState("asc");

const [totalPages, setTotalPages] = useState(1);
const applyFilters = () => {
  setSearch(searchInput);
  setCategory(categoryInput);
  setStatus(statusInput);
  setSort(sortInput);
  setPage(1);
};

const clearFilters = () => {
  setSearch("");
  setCategory("");
  setStatus("");
  setSort("asc");

  setSearchInput("");
  setCategoryInput("");
  setStatusInput("");
  setSortInput("asc");

  setPage(1);
};

const fetchProducts = async () => {



try {
setLoading(true);

  const res = await api.get(
    `/products?search=${search}&category=${category}&status=${status}&sort=${sort}&page=${page}`
  );

  setProducts(res.data.products || []);
  setTotalPages(res.data.totalPages || 1);
} catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
      "Failed to load products"
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
  fetchProducts();
}, [search, category, status, sort, page]);

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this product?"
);

if (!confirmDelete) return;

try {
  await api.delete(`/products/${id}`);

  toast.success(
    "Product deleted successfully"
  );

  fetchProducts();


} catch (error) {
  console.log(error);

  toast.error(
    error?.response?.data?.message ||
      "Failed to delete product"
  );
}

};

if (loading) {
return (
<>
<Navbar />
<div className="flex justify-center items-center h-[80vh]">
<h2 className="text-xl font-semibold">
Loading Products...
</h2>
</div>
</>
);
}

return (
<>
<Navbar />

 <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

  {/* Header */}
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-4xl font-bold text-gray-800">
        Product Management
      </h1>

      <p className="text-gray-500 mt-2">
        Manage inventory and stock efficiently.
      </p>
    </div>

    <Link
      to="/products/add"
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
    >
      <Plus size={18} />
      Add Product
    </Link>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-90">
            Total Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {products.length}
          </h2>
        </div>

        <Package size={50} />
      </div>
    </div>

    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-90">
            Active Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              products.filter(
                (p) => p.status === "Active"
              ).length
            }
          </h2>
        </div>

        <Package size={50} />
      </div>
    </div>

    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="opacity-90">
            Inactive Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {
              products.filter(
                (p) => p.status === "Inactive"
              ).length
            }
          </h2>
        </div>

        <Package size={50} />
      </div>
    </div>

  </div>

  {/* Filter Box */}
  <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
    <div className="flex flex-wrap gap-3 items-center">

      <input
        type="text"
        placeholder="Search Product..."
        value={searchInput}
        onChange={(e) =>
          setSearchInput(e.target.value)
        }
        className="border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Category"
        value={categoryInput}
        onChange={(e) =>
          setCategoryInput(e.target.value)
        }
        className="border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={statusInput}
        onChange={(e) =>
          setStatusInput(e.target.value)
        }
        className="border border-gray-300 px-4 py-2 rounded-xl"
      >
        <option value="">
          All Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>

      <select
        value={sortInput}
        onChange={(e) =>
          setSortInput(e.target.value)
        }
        className="border border-gray-300 px-4 py-2 rounded-xl"
      >
        <option value="asc">
          Price Low → High
        </option>

        <option value="desc">
          Price High → Low
        </option>
      </select>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>

      <button
        onClick={clearFilters}
        className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-gray-600 transition"
      >
        Clear
      </button>

    </div>
  </div>

    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <table className="w-full">
    <thead>
  <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <th className="p-3 text-left">
              Product
            </th>
            <th className="p-3 text-left">
              Category
            </th>
            <th className="p-3 text-left">
              Price
            </th>
            <th className="p-3 text-left">
              Quantity
            </th>
            <th className="p-3 text-left">
              Status
            </th>
            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
             <tr
  key={product._id}
 className="border-t hover:bg-blue-50 transition duration-200"
>
                <td className="p-3">
                  {product.productName}
                </td>

                <td className="p-3">
                  {product.category}
                </td>

                <td className="p-3">
                  ₹{product.price}
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      product.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

               <td className="p-3">
  <div className="flex gap-4">
                 <Link
  to={`/products/${product._id}`}
  className="text-blue-600"
>
  <Eye size={18} />
</Link>

                <Link
  to={`/products/edit/${product._id}`}
  className="text-green-600"
>
  <Pencil size={18} />
</Link>

                <button
  onClick={() =>
    handleDelete(product._id)
  }
  className="text-red-600"
>
  <Trash2 size={18} />
</button>
</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center p-5"
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          setPage(page + 1)
        }
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</>

);
}

export default Products