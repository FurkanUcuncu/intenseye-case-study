function localStorageHelper<T>(key: string, initialValue: T) {
    // Get stored value or use the initial value
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

    // Update localStorage when value changes
    const setStoredValue = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [parsedValue, setStoredValue] as const;
}

export default localStorageHelper;