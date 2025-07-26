import { useContext } from 'react';
import { AuthContext } from './AuthContextInstance';

/**
 * Custom hook to access the auth context
 * @returns {Object} Auth context with token, user, login, logout, and isAuthenticated
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
