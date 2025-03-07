import { useState, useCallback, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type AsyncFunction<T, P extends any[]> = (...args: P) => Promise<T>;

/**
 * Custom hook for handling asynchronous operations with loading and error states
 * 
 * @param asyncFunction The async function to execute
 * @param immediate Whether to execute the function immediately
 * @param initialData Initial data to use before the async function resolves
 * @returns Object containing data, loading state, error, and execute function
 */
export function useAsync<T, P extends any[] = []>(
  asyncFunction: AsyncFunction<T, P>,
  immediate = false,
  initialData: T | null = null
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: immediate,
    error: null,
  });

  // Function to execute the async function
  const execute = useCallback(
    async (...args: P) => {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      
      try {
        const data = await asyncFunction(...args);
        setState({ data, loading: false, error: null });
        return { data, error: null };
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: errorObject });
        return { data: null, error: errorObject };
      }
    },
    [asyncFunction]
  );

  // Execute the function immediately if requested
  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as P));
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    // Reset the state
    reset: useCallback(() => {
      setState({
        data: initialData,
        loading: false,
        error: null,
      });
    }, [initialData]),
  };
}

/**
 * Custom hook for handling async operations that should be executed immediately
 * and re-executed when dependencies change
 * 
 * @param asyncFunction The async function to execute
 * @param deps Dependencies array that will trigger re-execution when changed
 * @param initialData Initial data to use before the async function resolves
 * @returns Object containing data, loading state, error, and execute function
 */
export function useAsyncEffect<T, P extends any[] = []>(
  asyncFunction: AsyncFunction<T, P>,
  deps: React.DependencyList = [],
  initialData: T | null = null
) {
  const { data, loading, error, execute, reset } = useAsync<T, P>(
    asyncFunction,
    false,
    initialData
  );

  useEffect(() => {
    execute(...([] as unknown as P));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, execute, reset };
} 