import { useEffect, useState } from "react";
import { CartItem } from "../../data";

export function useLocalStorage<State>(key: string, defaultValue: State ) {
  const [value, setValue] = useState<State>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}