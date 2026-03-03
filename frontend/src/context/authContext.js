import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://expensetracker-backend-0nrd.onrender.com/api/v1/';

// Configure axios to send credentials (cookies) with all requests
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Token is now in cookie, not localStorage
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Try to verify token by making a protected request
      // This will work if cookie is present
      const response = await axios.get(`${BASE_URL}auth/me`);
      if (response.data.success) {
        setUser(response.data.data);
        setToken('authenticated'); // Just a flag, actual token is in cookie
      }
    } catch (error) {
      // Not authenticated - this is expected if user hasn't logged in
      // Don't log errors for 401 (unauthorized) as it's normal
      if (error.response && error.response.status !== 401) {
        console.error('Auth check error:', error);
      }
      setUser(null);
      setToken(null);
    }
  };

  const saveAuth = (responseData) => {
    // Backend returns: { success: true, data: { _id, name, email } }
    if (responseData.success && responseData.data) {
      setUser(responseData.data);
      setToken('authenticated'); // Token is in HttpOnly cookie
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);
      setAuthError(null);
      const { data } = await axios.post(`${BASE_URL}auth/register`, payload, {
        withCredentials: true,
      });
      saveAuth(data);
      return data; // Return data on success
    } catch (error) {
      console.error('Registration Error:', error);
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'Unable to connect to server. Please check if the backend is running.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      setAuthError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    try {
      setLoading(true);
      setAuthError(null);
      const { data } = await axios.post(`${BASE_URL}auth/login`, payload, {
        withCredentials: true,
      });
      saveAuth(data);
      return data; // Return data on success
    } catch (error) {
      console.error('Login Error:', error);
      let errorMessage = 'Login failed';
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'Unable to connect to server. Please check if the backend is running.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      setAuthError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}auth/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    authError,
    register,
    login,
    logout,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


