import React from 'react';

const Login = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Login / Sign Up</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <select className="w-full p-2 border rounded">
          <option value="vendor">Vendor</option>
          <option value="supplier">Supplier</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Login;