import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/my-products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching supplier products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-green-700 mb-4">Supplier Dashboard</h1>

      <button
        onClick={() => navigate("/create-product")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Add New Product
      </button>

      {loading ? (
        <p>Loading your products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">You haven’t added any products yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow transition"
            >
              <img
                src={product.images?.[0]?.url || "https://placehold.co/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">Stock: {product.suppliers[0]?.stock || 0}</p>
              <p className="text-sm text-gray-600">Price: ₹{product.suppliers[0]?.price || "N/A"}</p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/edit-product/${product._id}`)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierDashboard;