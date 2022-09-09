import { useEffect, useState } from 'react';

export default function useSupportsClipboardRead() {
  const [supportsClipboardRead, setSupportsClipboardRead] =
    useState(false);

  useEffect(() => {
    if (typeof navigator.clipboard?.readText === 'function') {
      setSupportsClipboardRead(true);
    }
  }, []);

  return supportsClipboardRead;
}
