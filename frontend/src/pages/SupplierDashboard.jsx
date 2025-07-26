import React from "react";
import { Link } from "react-router-dom";

const SupplierDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">Welcome Supplier!</h1>
      <p>This is your dashboard.</p>
      <Link to={"/create-product"} >Upload Product</Link>
    </div>
  );
};

export default SupplierDashboard;
