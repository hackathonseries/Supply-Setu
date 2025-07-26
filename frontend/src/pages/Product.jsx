import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`http://localhost:5001/api/product/${id}`);
        console.log(res);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">Loading...</div>
    );
  }

  return <div>Product</div>;
};

export default Product;
