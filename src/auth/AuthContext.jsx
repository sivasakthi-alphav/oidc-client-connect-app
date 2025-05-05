import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import oidcClient from './oidcClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the OpenID client on mount
  useEffect(() => {
    initClient();
  }, []);

  const initClient = async () => {
    try {
      await oidcClient.initializeClient();
      // Check if user is already authenticated
      const currentUser = await oidcClient.getUser();
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
      }
    } catch (err) {
      console.error('Failed to initialize OpenID client:', err);
      setError(err.message);
    }
  };

  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await oidcClient.login();
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCallback = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await oidcClient.handleCallback();
      setIsAuthenticated(true);
      setUser(user);
    } catch (err) {
      console.error('Callback error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await oidcClient.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    handleCallback
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 