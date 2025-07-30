import { useState } from 'react';

function useLocalStorage(key, defaultVal) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  });

  const setValue = valOrFn => {
    try {
      const value =
        typeof valOrFn === 'function'
          ? valOrFn(storedValue)
          : valOrFn;
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error(`Failed to set localStorage for key "${key}"`);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
