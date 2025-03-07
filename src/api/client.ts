import apiConfig, { REQUEST_TIMEOUT, DEFAULT_HEADERS } from './config';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Timeout promise for fetch requests
 */
const timeoutPromise = (ms: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new ApiError('Request timeout', 408));
    }, ms);
  });
};

/**
 * Base fetch function with timeout and error handling
 */
const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await Promise.race([
      fetch(url, options),
      timeoutPromise(REQUEST_TIMEOUT),
    ]) as Response;

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other issues
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
};

/**
 * API client with methods for common HTTP requests
 */
const apiClient = {
  /**
   * GET request
   */
  get: async <T>(endpoint: string, token?: string): Promise<T> => {
    const headers = token
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
      : DEFAULT_HEADERS;

    return fetchWithTimeout(endpoint, {
      method: 'GET',
      headers,
    });
  },

  /**
   * POST request
   */
  post: async <T>(endpoint: string, data: any, token?: string): Promise<T> => {
    const headers = token
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
      : DEFAULT_HEADERS;

    return fetchWithTimeout(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request
   */
  put: async <T>(endpoint: string, data: any, token?: string): Promise<T> => {
    const headers = token
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
      : DEFAULT_HEADERS;

    return fetchWithTimeout(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  },

  /**
   * PATCH request
   */
  patch: async <T>(endpoint: string, data: any, token?: string): Promise<T> => {
    const headers = token
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
      : DEFAULT_HEADERS;

    return fetchWithTimeout(endpoint, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request
   */
  delete: async <T>(endpoint: string, token?: string): Promise<T> => {
    const headers = token
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` }
      : DEFAULT_HEADERS;

    return fetchWithTimeout(endpoint, {
      method: 'DELETE',
      headers,
    });
  },
};

export default apiClient; 