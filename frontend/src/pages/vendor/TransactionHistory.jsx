import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import api from '../../api';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [activeTab]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = activeTab !== 'all' ? `?type=${activeTab}` : '';
      const response = await api.get(`/transactions/vendor/${user.id}${params}`);
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (transactionId, newStatus) => {
    try {
      await api.patch(`/transactions/${transactionId}/status`, { status: newStatus });
      fetchTransactions();
      alert('Status updated successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTransactionTypeLabel = (type) => {
    return type === 'surplus_exchange' ? 'Surplus Exchange' : 'Supplier Order';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transaction history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">Track your surplus exchanges and supplier orders</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab('surplus_exchange')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'surplus_exchange'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Surplus Exchanges
            </button>
            <button
              onClick={() => setActiveTab('supplier_order')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'supplier_order'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Supplier Orders
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {transaction.transactionType === 'surplus_exchange' 
                      ? transaction.surplusDetails?.materialType 
                      : `${transaction.supplierProducts?.length || 0} Products`
                    }
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getTransactionTypeLabel(transaction.transactionType)} • {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setShowDetailsModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total Amount:</span> ${transaction.totalAmount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Counterparty:</span> {transaction.seller?.name || transaction.buyer?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Invoice:</span> {transaction.invoice?.invoiceNumber || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Status Update Actions */}
              {transaction.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(transaction._id, 'confirmed')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(transaction._id, 'cancelled')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {transaction.status === 'confirmed' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(transaction._id, 'processing')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Start Processing
                  </button>
                </div>
              )}

              {transaction.status === 'processing' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(transaction._id, 'shipped')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                  >
                    Mark Shipped
                  </button>
                </div>
              )}

              {transaction.status === 'shipped' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(transaction._id, 'delivered')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Mark Delivered
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500">Your transaction history will appear here</p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transaction ID</p>
                  <p className="text-gray-900">{selectedTransaction._id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <p className="text-gray-900">{getTransactionTypeLabel(selectedTransaction.transactionType)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-gray-900">${selectedTransaction.totalAmount}</p>
                </div>
              </div>

              {/* Transaction Details */}
              {selectedTransaction.transactionType === 'surplus_exchange' && selectedTransaction.surplusDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Surplus Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Material</p>
                      <p className="text-gray-900">{selectedTransaction.surplusDetails.materialType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quantity</p>
                      <p className="text-gray-900">{selectedTransaction.surplusDetails.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Price Per Unit</p>
                      <p className="text-gray-900">${selectedTransaction.surplusDetails.pricePerUnit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Location</p>
                      <p className="text-gray-900">{selectedTransaction.surplusDetails.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTransaction.transactionType === 'supplier_order' && selectedTransaction.supplierProducts && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-3">
                    {selectedTransaction.supplierProducts.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.product?.name}</p>
                          <p className="text-sm text-gray-600">${item.unitPrice} per {item.product?.unit}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{item.quantity} {item.product?.unit}</p>
                          <p className="text-sm text-gray-600">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status History</h3>
                <div className="space-y-2">
                  {selectedTransaction.statusHistory?.map((status, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{status.status.replace('_', ' ')}</p>
                        <p className="text-sm text-gray-600">{status.notes}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(status.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice Info */}
              {selectedTransaction.invoice && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Invoice Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Invoice Number</p>
                      <p className="text-gray-900">{selectedTransaction.invoice.invoiceNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Generated</p>
                      <p className="text-gray-900">{new Date(selectedTransaction.invoice.generatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Payment Status</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedTransaction.invoice.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedTransaction.invoice.paid ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 