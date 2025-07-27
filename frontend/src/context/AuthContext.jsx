import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContextInstance';

// Safe localStorage getter with error handling
const getFromStorage = (key, parser = (x) => x) => {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? parser(value) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
};

const AuthProvider = ({ children }) => {
  // Initialize state from localStorage with safe access
  const [token, setToken] = useState(() => getFromStorage('token'));
  const [user, setUser] = useState(() => 
    getFromStorage('user', (data) => {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Invalid user data in localStorage:', error);
        return null;
      }
    })
  );

  // Login function - sets state and localStorage
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    
    try {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  };

  // Logout function - clears state and localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
    
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing auth data:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = Boolean(token);

  // Optional: Check token validity on mount
  useEffect(() => {
    // Could be extended to check token validity with your backend
    if (token) {
      // You could add JWT expiry checking here
      // Example: check if token is expired based on decoded payload
    }
  }, [token]);

  // Create memoized context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(
    () => ({ 
      token, 
      user, 
      login, 
      logout, 
      isAuthenticated 
    }), 
    [token, user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;