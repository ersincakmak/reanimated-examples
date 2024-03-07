import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: T): T => {
  const prevValueRef = useRef<T>(value);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
};
