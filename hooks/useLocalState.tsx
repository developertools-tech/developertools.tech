import { Dispatch, SetStateAction, useState } from 'react';

import useLayoutEffect from './useIsomorphicLayoutEffect';

export default function useLocalState<T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}): [T, Dispatch<SetStateAction<T>>] {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<T>(() => {
    if (typeof defaultValue === 'function') {
      return defaultValue();
    }
    return defaultValue;
  });

  useLayoutEffect(() => {
    if (!loaded) {
      setLoaded(true);
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) {
        try {
          setValue(JSON.parse(jsonValue));
        } catch (_e) {
          return undefined;
        }
      }
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return undefined;
  }, [key, value, loaded]);

  return [value, setValue];
}
