import React, { useEffect, useRef } from 'react';

export default function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
