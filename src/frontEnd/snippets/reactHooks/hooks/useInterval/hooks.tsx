import { useRef, useEffect, useState } from 'react';

const useInterval: (callback: () => void, delay: number | null) => void = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return; // 通过delay控制定时器是否关闭
    }
    let id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
