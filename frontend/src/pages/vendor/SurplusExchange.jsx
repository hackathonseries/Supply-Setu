import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import api from '../../api';

const SurplusExchange = () => {
  const { user } = useAuth();
  const [surplusPosts, setSurplusPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [formData, setFormData] = useState({
    materialType: '',
    quantity: '',
    pricePerUnit: '',
    location: '',
    expiryHours: '24'
  });

  useEffect(() => {
    fetchSurplusPosts();
  }, []);

  const fetchSurplusPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/surplus/available');
      setSurplusPosts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching surplus posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);

    try {
      await api.post('/surplus/post', formData);
      alert('Surplus posted successfully!');
      setShowPostModal(false);
      setFormData({
        materialType: '',
        quantity: '',
        pricePerUnit: '',
        location: '',
        expiryHours: '24'
      });
      fetchSurplusPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post surplus');
    } finally {
      setPosting(false);
    }
  };

  const handleBookSurplus = async (surplusId) => {
    try {
      await api.post('/transactions/surplus/book', { surplusPostId: surplusId });
      alert('Surplus booked successfully!');
      fetchSurplusPosts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to book surplus');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading surplus marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="mt-20 text-3xl font-bold text-gray-900 mb-2">Surplus Exchange</h1>
              <p className="text-gray-600">Buy and sell surplus materials with other vendors</p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Post Surplus
            </button>
          </div>
        </div>

        {/* Surplus Marketplace */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {surplusPosts.map((surplus) => (
            <div key={surplus._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{surplus.materialType}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Quantity:</span> {surplus.quantity} units
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price:</span> ₹{surplus.pricePerUnit}/unit
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {surplus.location}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Vendor:</span> {surplus.vendor?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span> {new Date(surplus.expiryTime).toLocaleDateString()}
                </p>
              </div>

              {surplus.vendor?._id !== user.id && (
                <button
                  onClick={() => handleBookSurplus(surplus._id)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                >
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>

        {surplusPosts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No surplus items available</h3>
            <p className="text-gray-500">Be the first to post surplus materials</p>
          </div>
        )}
      </div>

      {/* Post Surplus Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Post Surplus</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-gray-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material Name *
                </label>
                <input
                  type="text"
                  name="materialType"
                  value={formData.materialType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Steel, Plastic, Chemicals"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Number of units"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Unit *
                </label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Price per unit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Pickup location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expires In (hours)
                </label>
                <select
                  name="expiryHours"
                  value={formData.expiryHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                  <option value="168">1 week</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={posting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {posting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </div>
                  ) : (
                    'Post Surplus'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurplusExchange; 