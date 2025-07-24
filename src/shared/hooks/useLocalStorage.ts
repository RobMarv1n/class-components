import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = globalThis.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading "${key}" from localStorage:`, error);
      globalThis.localStorage.removeItem(key);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing "${key}" to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
