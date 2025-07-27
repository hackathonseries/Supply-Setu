import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditProduct = () => {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const p = res.data;
        setProduct(p);
        setForm({
          name: p.name,
          description: p.description,
          stock: p.suppliers?.[0]?.stock || 0,
          price: p.suppliers?.[0]?.price || 0,
        });
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, {
        ...form,
        stock: parseInt(form.stock),
        price: parseFloat(form.price),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product updated!");
      navigate("/supplier-dashboard");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update. Try again.");
    }
  };

  if (!product) return <p className="p-6">Loading product...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={0}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={0}
            required
          />
        </div>

                        <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded"
                >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;