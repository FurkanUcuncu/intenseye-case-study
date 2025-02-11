import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    // Get stored value or use the initial value
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState<T>(parsedValue);

    // Update localStorage when value changes
    const setStoredValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setStoredValue] as const;
}

export default useLocalStorage;