import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/product/all");
        const processedProducts = res.data.map((product) => {
          const prices = product.suppliers.map((supplier) => supplier.price);
          const descriptions = product.suppliers.map((supplier) => supplier.description);
          const totalStock = product.suppliers.reduce((sum, supplier) => sum + supplier.stock, 0);
          const img = product.images && product.images.length > 0 ? product.images[0].url : null;

          return {
            ...product,
            priceRange: `${Math.min(...prices)} - ${Math.max(...prices)}`,
            combinedDescription: descriptions.join(", "),
            totalStock,
            img,
          };
        });
        setProducts(processedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="bg-white shadow-md rounded-md p-4">
                <img src={product.img || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'} alt={product.name} />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price Range:</span> {product.priceRange}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Stock:</span> {product.totalStock}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Description:</span> {product.combinedDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;