// src/pages/vendor/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuth';
import api from '../../api'; // your axios instance
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [topSuppliers, setTopSuppliers] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch monthly summary
        const monthlySummaryRes = await api.get('/vendor/analytics/monthly-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Fetch top suppliers
        const topSuppliersRes = await api.get('/vendor/analytics/top-suppliers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Process monthly summary data
        const summaryData = monthlySummaryRes.data.success ? monthlySummaryRes.data.summary : [];
        const processedSummary = {
          totalOrders: summaryData.length,
          totalSpent: summaryData.reduce((acc, month) => acc + month.totalSpent, 0),
          totalProducts: summaryData.reduce((acc, month) => acc + month.totalQuantity, 0)
        };
        
        // Process top suppliers data
        const topSuppliersData = topSuppliersRes.data.success ? topSuppliersRes.data.topSuppliers : [];
        const processedSuppliers = topSuppliersData.map(supplier => ({
          name: supplier.supplierDetails.name,
          orders: supplier.totalQuantity,
          totalSpend: supplier.totalSpent
        }));
        
        setSummary(processedSummary);
        setTopSuppliers(processedSuppliers);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        alert('Failed to load analytics');
        navigate('/');
      }
    };

    fetchAnalytics();
  }, [token, navigate]);

  if (!summary) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Vendor Analytics</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">📈 Monthly Purchase Summary</h3>
        <p>Total Orders: <strong>{summary.totalOrders}</strong></p>
        <p>Total Spend: <strong>₹{summary.totalSpent}</strong></p>
        <p>Products Purchased: <strong>{summary.totalProducts}</strong></p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">🏆 Top Suppliers</h3>
        {topSuppliers.length === 0 ? (
          <p className="text-gray-600">No data available.</p>
        ) : (
          <ul className="space-y-2">
            {topSuppliers.map((supplier, index) => (
              <li key={index} className="p-3 border rounded shadow-sm">
                <p><strong>{supplier.name}</strong></p>
                <p>Orders: {supplier.orders}</p>
                <p>Total Spend: ₹{supplier.totalSpend}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Analytics;