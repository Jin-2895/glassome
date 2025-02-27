import { useEffect, useState } from "react";

export const useDebounce = <T = unknown>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounced;
};
