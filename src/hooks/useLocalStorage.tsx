import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Fungsi khusus untuk token
export const useAuthToken = () => {
  const [token, setToken] = useLocalStorage<string | null>("authToken", null);

  const saveToken = (data: any) => {
    setToken(data.token);
    window.localStorage.setItem("authToken", data.token);
    window.localStorage.setItem("authName", data.name);
  };

  const removeToken = () => {
    setToken(null);
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("authName");
  };

  return { token, saveToken, removeToken };
};

export default useLocalStorage;
