import { useRef } from 'react';

export const useDebounce = (delayGlobal: number = 350) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (func: () => void, delay: number = delayGlobal) => {
    const clear = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };

    clear();

    timer.current = setTimeout(func, delay);

    return clear;
  };
};
