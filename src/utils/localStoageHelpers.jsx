// Utility function to set an item in localStorage
export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Utility function to get an item from localStorage
export const getLocalStorage = (key, defaultValue = null) => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };
  
// Utility function to remove an item from localStorage
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
};
