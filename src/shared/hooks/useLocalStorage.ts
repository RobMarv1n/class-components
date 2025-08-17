'use client';

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = globalThis.localStorage?.getItem(key);
      if (item) setStoredValue(JSON.parse(item) as T);
    } catch (error) {
      console.warn(`Error reading "${key}" from localStorage:`, error);
      globalThis.localStorage?.removeItem(key);
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      globalThis.localStorage?.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing "${key}" to localStorage:`, error);
    }
  }, [key, storedValue, hydrated]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
