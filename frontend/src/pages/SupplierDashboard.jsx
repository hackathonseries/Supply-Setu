import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import api from '../api';

const SupplierDashboard = () => {
  const { user } = useAuth();
  const [productOrders, setProductOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchSupplierData();
  }, []);

  const fetchSupplierData = async () => {
    try {
      setLoading(true);
      
      // Fetch supplier's products
      const productsResponse = await api.get(`/products/supplier/${user.id}`);
      setMyProducts(productsResponse.data.data || []);

      // Fetch orders/transactions for supplier's products
      const transactionsResponse = await api.get(`/transactions/supplier/${user.id}`);
      setProductOrders(transactionsResponse.data.data || []);

      // Fetch supplier's deliveries
      const deliveriesResponse = await api.get(`/delivery/supplier/${user.id}`);
      setDeliveries(deliveriesResponse.data.data || []);

    } catch (error) {
      console.error('Error fetching supplier data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryStatusUpdate = async (deliveryId, newStatus) => {
    try {
      await api.patch(`/delivery/${deliveryId}/status`, { status: newStatus });
      fetchSupplierData(); // Refresh data
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const handleToggleProductStatus = async (productId) => {
    try {
      await api.patch(`/products/${productId}/toggle`);
      fetchSupplierData(); // Refresh data
      alert('Product status updated successfully!');
    } catch (error) {
      console.error('Error toggling product status:', error);
      alert('Failed to update product status');
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.patch(`/transactions/${orderId}/status`, { status: newStatus });
      fetchSupplierData(); // Refresh data
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white mt-20 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">Manage your products, orders, and deliveries</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                My Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Product Orders
              </button>
              <button
                onClick={() => setActiveTab('deliveries')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'deliveries'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Deliveries
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">My Products</p>
                    <p className="text-2xl font-bold text-gray-900">{myProducts.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Product Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{productOrders.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
                    <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.status !== 'delivered' && d.status !== 'cancelled').length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{deliveries.filter(d => d.status === 'delivered').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {productOrders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        New order for {order.supplierProducts?.length || 0} products
                      </p>
                      <p className="text-sm text-gray-600">
                        Order #{order.invoice?.invoiceNumber} • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
                {productOrders.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent orders</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                              <button
                  onClick={() => window.location.href = '/create-product'}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                >
                Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price:</span> ₹{product.price}/{product.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Stock:</span> {product.stockQuantity} {product.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Min Order:</span> {product.minimumOrderQuantity} {product.unit}
                    </p>
                    {product.featured && (
                      <p className="text-sm text-blue-600">
                        <span className="font-medium">⭐ Featured Product</span>
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.location.href = `/edit-product/${product._id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleProductStatus(product._id)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                        product.isActive 
                          ? 'bg-red-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}
                    >
                      {product.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {myProducts.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-500">Start by adding your first product to the marketplace</p>
                <button
                  onClick={() => window.location.href = '/create-product'}
                  className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                >
                  Add Your First Product
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Product Orders</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {productOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Order #{order.invoice?.invoiceNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.supplierProducts?.length || 0} products
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.buyer?.name}</div>
                          <div className="text-sm text-gray-500">{order.buyer?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {order.status === 'pending' && (
                              <button
                                onClick={() => handleOrderStatusUpdate(order._id, 'confirmed')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Confirm
                              </button>
                            )}
                            {order.status === 'confirmed' && (
                              <button
                                onClick={() => handleOrderStatusUpdate(order._id, 'processing')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Start Processing
                              </button>
                            )}
                            {order.status === 'processing' && (
                              <button
                                onClick={() => handleOrderStatusUpdate(order._id, 'shipped')}
                                className="text-purple-600 hover:text-purple-900"
                              >
                                Mark Shipped
                              </button>
                            )}
                            {order.status === 'shipped' && (
                              <button
                                onClick={() => handleOrderStatusUpdate(order._id, 'delivered')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Mark Delivered
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-900">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {productOrders.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500">Orders from vendors will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'deliveries' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Deliveries</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Deliveries</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pickup Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {deliveries.map((delivery) => (
                      <tr key={delivery._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {delivery.surplusPost?.materialType}
                            </div>
                            <div className="text-sm text-gray-500">
                              {delivery.surplusPost?.quantity} units
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{delivery.vendor?.name}</div>
                          <div className="text-sm text-gray-500">{delivery.vendor?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {delivery.pickupDetails?.scheduledDate ? 
                            new Date(delivery.pickupDetails.scheduledDate).toLocaleDateString() : 
                            'Not scheduled'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            delivery.status === 'picked_up' ? 'bg-blue-100 text-blue-800' :
                            delivery.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            delivery.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {delivery.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {delivery.status === 'pending' && (
                              <button
                                onClick={() => handleDeliveryStatusUpdate(delivery._id, 'in_progress')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Start
                              </button>
                            )}
                            {delivery.status === 'in_progress' && (
                              <button
                                onClick={() => handleDeliveryStatusUpdate(delivery._id, 'picked_up')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Mark Picked Up
                              </button>
                            )}
                            {delivery.status === 'picked_up' && (
                              <button
                                onClick={() => handleDeliveryStatusUpdate(delivery._id, 'delivered')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Mark Delivered
                              </button>
                            )}
                            <button className="text-blue-600 hover:text-blue-900">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {deliveries.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries yet</h3>
                <p className="text-gray-500">Create delivery requests for your confirmed bookings</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;
