import apiClient, { ApiError } from './client';
import apiConfig, { ENDPOINTS } from './config';

export { apiClient, ApiError, apiConfig, ENDPOINTS };

// Export default as the client for convenience
export default apiClient; 