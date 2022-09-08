import { useEffect, useState } from 'react';

export default function useLocalState<T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}): [T, (_arg0: T) => void] {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<T>(() => {
    if (typeof defaultValue === 'function') {
      return defaultValue();
    }
    return defaultValue;
  });

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) {
        setValue(JSON.parse(jsonValue));
      }
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return undefined;
  }, [key, value, loaded]);

  return [value, setValue];
}
