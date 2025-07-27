import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../api';

const CreateDelivery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [formData, setFormData] = useState({
    pickupDetails: {
      scheduledDate: '',
      pickupLocation: '',
      contactPerson: '',
      contactPhone: '',
      specialInstructions: ''
    },
    deliveryDetails: {
      deliveryAddress: '',
      deliveryContact: '',
      deliveryPhone: '',
      deliveryNotes: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      const response = await api.get(`/bookings/supplier/${user.id}`);
      const confirmed = response.data.data.filter(booking => booking.status === 'confirmed');
      setConfirmedBookings(confirmed);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) {
      setError('Please select a booking');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/delivery/create', {
        bookingId: selectedBooking,
        pickupDetails: formData.pickupDetails,
        deliveryDetails: formData.deliveryDetails
      });
      console.log(response);

      alert('Delivery request created successfully!');
      navigate('/supplier-dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create delivery request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white mt-20 rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Delivery Request</h1>
            <p className="text-gray-600">Schedule a delivery for your confirmed booking</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Booking Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Confirmed Booking *
              </label>
              <select
                value={selectedBooking}
                onChange={(e) => setSelectedBooking(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
              >
                <option value="">Choose a confirmed booking</option>
                {confirmedBookings.map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {booking.surplusPost?.materialType} - {booking.surplusPost?.quantity} units from {booking.vendor?.name}
                  </option>
                ))}
              </select>
              {confirmedBookings.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">No confirmed bookings available</p>
              )}
            </div>

            {/* Pickup Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pickup Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Pickup Date *
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupDetails.scheduledDate"
                    value={formData.pickupDetails.scheduledDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    name="pickupDetails.pickupLocation"
                    value={formData.pickupDetails.pickupLocation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="e.g., Warehouse A, Building 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="pickupDetails.contactPerson"
                    value={formData.pickupDetails.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="Contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="pickupDetails.contactPhone"
                    value={formData.pickupDetails.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="Phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    name="pickupDetails.specialInstructions"
                    value={formData.pickupDetails.specialInstructions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg resize-none"
                    placeholder="Any special instructions for pickup..."
                  />
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="deliveryDetails.deliveryAddress"
                    value={formData.deliveryDetails.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="Complete delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Contact *
                  </label>
                  <input
                    type="text"
                    name="deliveryDetails.deliveryContact"
                    value={formData.deliveryDetails.deliveryContact}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="Contact person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Phone *
                  </label>
                  <input
                    type="tel"
                    name="deliveryDetails.deliveryPhone"
                    value={formData.deliveryDetails.deliveryPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg"
                    placeholder="Phone number"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Notes
                  </label>
                  <textarea
                    name="deliveryDetails.deliveryNotes"
                    value={formData.deliveryDetails.deliveryNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white focus:shadow-lg resize-none"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/supplier-dashboard')}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || confirmedBookings.length === 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  'Create Delivery Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDelivery; 