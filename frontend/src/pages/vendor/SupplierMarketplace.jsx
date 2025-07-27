import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/useAuth';
import api from '../../api';

const handleCheckout = async () => {
  try {
    if (!user || cart.length === 0) return;

    const orderData = {
      products: cart.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      })),
      seller: cart[0].product.supplier._id, // ✅ Added seller
      buyer: user._id,                      // ✅ Added buyer
      orderDetails: {
        shippingAddress: 'Default shipping address',
        billingAddress: 'Default billing address',
        paymentMethod: 'Credit Card',
        notes: 'Order from supplier marketplace'
      }
    };

    // Step 1: Create the order on the server
    const orderResponse = await api.post("/transactions/supplier/order", orderData);
    const savedOrder = orderResponse.data.order;

    // Step 2: Create Razorpay order
    const razorpayResponse = await api.post("/transactions/razorpay/create-order", {
      amount: savedOrder.totalAmount || 500 // Use actual amount or fallback
    });

    const { order } = razorpayResponse.data;

    // Step 3: Open Razorpay payment popup
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your App Name",
      description: "Purchase from Supplier Marketplace",
      order_id: order.id,
      handler: async function (response) {
        const verificationRes = await api.post("/transactions/razorpay/verify", response);
        console.log("Payment verification:", verificationRes.data);
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Checkout failed:", error.message);
  }
};

const SupplierMarketplace = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    supplier: '',
    search: '',
    sort: 'createdAt',
    order: 'desc'
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.supplier) params.append('supplier', filters.supplier);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.order) params.append('order', filters.order);

      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.product._id === product._id);
    
    if (existingItem) {
      setCart(prev => prev.map(item => 
        item.product._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prev => [...prev, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => prev.map(item => 
      item.product._id === productId 
        ? { ...item, quantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setCheckoutLoading(true);

    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item.product._id,
          quantity: item.quantity
        })),
        orderDetails: {
          shippingAddress: 'Default shipping address',
          billingAddress: 'Default billing address',
          paymentMethod: 'Credit Card',
          notes: 'Order from supplier marketplace'
        }
      };

      // Step 1: Create the order on the server
      console.log('Creating order with data:', orderData);
      const orderResponse = await api.post("/transactions/supplier/order", orderData);
      console.log('Order response:', orderResponse.data);
      const savedOrder = orderResponse.data.data;

      // Step 2: Create Razorpay order
      console.log('Creating Razorpay order with amount:', savedOrder.totalAmount);
      const razorpayResponse = await api.post("/payment/create-order", {
        amount: savedOrder.totalAmount,
        items: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        seller: cart[0].product.supplier._id,
        transactionId: savedOrder._id
      });
      console.log('Razorpay response:', razorpayResponse.data);

      const { orderId, amount, currency } = razorpayResponse.data;

      // Step 3: Open Razorpay payment popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_zAH9zO8Co1kTn8',
        amount: amount,
        currency: currency,
        name: "Street Food Supply Chain",
        description: "Purchase from Supplier Marketplace",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verificationRes = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              transactionId: savedOrder._id
            });
            
            if (verificationRes.data.success) {
              alert('Payment successful! Order confirmed.');
              setCart([]);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#10b981"
        },
        modal: {
          ondismiss: function() {
            setCheckoutLoading(false);
          }
        }
      };

      console.log('Opening Razorpay popup with options:', options);
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(error.response?.data?.message || 'Failed to process checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading supplier marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="mt-20 text-3xl font-bold text-gray-900 mb-2">Supplier Marketplace</h1>
          <p className="text-gray-600">Browse and order products from suppliers</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters and Products */}
          <div className="flex-1">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="createdAt">Date Added</option>
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <select
                    value={filters.order}
                    onChange={(e) => handleFilterChange('order', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Price:</span> ₹{product.price}/{product.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Stock:</span> {product.stockQuantity} {product.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Min Order:</span> {product.minimumOrderQuantity} {product.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Supplier:</span> {product.supplier?.name}
                    </p>
                  </div>

                  {product.isActive && (
                                      <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
                  >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Cart</h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">₹{item.product.price}/{item.product.unit}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateCartQuantity(item.product._id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product._id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            className="text-red-500 ml-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-gray-900">₹{getCartTotal().toFixed(2)}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={checkoutLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {checkoutLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        'Checkout'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMarketplace;