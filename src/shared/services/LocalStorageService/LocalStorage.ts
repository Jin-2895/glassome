const getItem = <T>(key: string) => {
  const localStorageItem = localStorage.getItem(key);
  if (!localStorageItem) {
    return null;
  }

  const parsedItem = JSON.parse(localStorageItem);
  return parsedItem as T;
};

const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

const clearLocalStorage = () => {
  localStorage.clear();
};

export const LocalStorageService = {
  getItem,
  setItem,
  removeItem,
  clearLocalStorage,
};
