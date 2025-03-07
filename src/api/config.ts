/**
 * API Configuration
 * 
 * This file contains configuration for API endpoints and related settings.
 * It uses environment variables that can be configured in Vercel.
 */

// API base URL from environment variables
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Environment
export const IS_PRODUCTION = process.env.REACT_APP_ENV === 'production';

// Version from package.json
export const APP_VERSION = process.env.REACT_APP_VERSION || '0.1.0';

// App name from package.json
export const APP_NAME = process.env.REACT_APP_NAME || 'STEAM Experiment Hub';

// API endpoints
export const ENDPOINTS = {
  experiments: `${API_URL}/experiments`,
  badges: `${API_URL}/badges`,
  users: `${API_URL}/users`,
  progress: `${API_URL}/progress`,
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Function to get auth headers if needed
export const getAuthHeaders = (token?: string) => {
  if (!token) return DEFAULT_HEADERS;
  
  return {
    ...DEFAULT_HEADERS,
    Authorization: `Bearer ${token}`,
  };
};

// API configuration object
const apiConfig = {
  API_URL,
  IS_PRODUCTION,
  APP_VERSION,
  APP_NAME,
  ENDPOINTS,
  REQUEST_TIMEOUT,
  DEFAULT_HEADERS,
  getAuthHeaders,
};

export default apiConfig; 