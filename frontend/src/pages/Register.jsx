import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('http://localhost:5001/api/auth/register', formData);
      console.log(res);
      alert('Registered Successfully!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="w-full p-2 border" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border" />
        <select name="role" onChange={handleChange} className="w-full p-2 border">
          <option value="">Select Role</option>
          <option value="Supplier">Supplier</option>
          <option value="Vendor">Vendor</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;