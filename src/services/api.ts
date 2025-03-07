import { Experiment, Badge } from '../types';

/**
 * API Service for handling all data fetching operations
 * This provides a centralized place for API calls, error handling, and response formatting
 */

// Base URL for API calls
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Generic error handling for fetch operations
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
};

// Timeout wrapper for fetch to prevent hanging requests
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> => {
  const controller = new AbortController();
  const { signal } = controller;
  
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

// API methods
export const api = {
  // Experiments
  experiments: {
    getAll: async (): Promise<Experiment[]> => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/experiments`);
        return handleResponse<Experiment[]>(response);
      } catch (error) {
        console.error('Failed to fetch experiments:', error);
        // Return empty array as fallback
        return [];
      }
    },
    
    getById: async (id: string): Promise<Experiment | null> => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/experiments/${id}`);
        return handleResponse<Experiment>(response);
      } catch (error) {
        console.error(`Failed to fetch experiment with id ${id}:`, error);
        return null;
      }
    },
  },
  
  // Badges
  badges: {
    getAll: async (): Promise<Badge[]> => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/badges`);
        return handleResponse<Badge[]>(response);
      } catch (error) {
        console.error('Failed to fetch badges:', error);
        return [];
      }
    },
  },
  
  // User progress
  progress: {
    get: async (): Promise<any> => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/progress`);
        return handleResponse<any>(response);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
        return {};
      }
    },
    
    update: async (experimentId: string, data: any): Promise<any> => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ experimentId, ...data }),
        });
        return handleResponse<any>(response);
      } catch (error) {
        console.error('Failed to update progress:', error);
        return null;
      }
    },
  },
};

// Export a mock API for testing or when the backend is not available
export const mockApi = {
  experiments: {
    getAll: async (): Promise<Experiment[]> => {
      return [
        {
          id: 'acid-base-titration',
          title: 'Acid-Base Titration',
          description: 'Determine the concentration of an acid by titrating it with a base of known concentration.',
          imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          tags: ['Chemistry', 'Voice Control', 'Beginner'],
          difficulty: 'beginner',
        },
        {
          id: 'pendulum-motion',
          title: 'Pendulum Motion',
          description: 'Explore the factors that affect the period of a pendulum.',
          imageUrl: 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          tags: ['Physics', 'Coming Soon'],
          difficulty: 'intermediate',
          comingSoon: true,
        },
        {
          id: 'dna-extraction',
          title: 'DNA Extraction',
          description: 'Extract DNA from fruits using household materials.',
          imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          tags: ['Biology', 'Coming Soon'],
          difficulty: 'advanced',
          comingSoon: true,
        },
      ];
    },
    getById: async (id: string): Promise<Experiment | null> => {
      const experiments = await mockApi.experiments.getAll();
      return experiments.find(exp => exp.id === id) || null;
    },
  },
  badges: {
    getAll: async (): Promise<Badge[]> => {
      return [
        {
          id: 'first-experiment',
          name: 'First Steps',
          description: 'Complete your first experiment',
          imageUrl: 'https://img.icons8.com/color/96/test-tube.png',
          earned: true,
          earnedDate: new Date().toISOString(),
        },
        {
          id: 'perfect-score',
          name: 'Perfect Score',
          description: 'Get a perfect score on any experiment',
          imageUrl: 'https://img.icons8.com/color/96/prize.png',
          earned: false,
        },
        {
          id: 'chemistry-whiz',
          name: 'Chemistry Whiz',
          description: 'Complete the Acid-Base Titration experiment',
          imageUrl: 'https://img.icons8.com/color/96/laboratory-flask.png',
          earned: false,
        },
      ];
    },
  },
  progress: {
    get: async (): Promise<any> => {
      return [];
    },
    update: async (experimentId: string, data: any): Promise<any> => {
      console.log('Mock update progress:', experimentId, data);
      return { success: true };
    },
  },
}; 