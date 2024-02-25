import { useEffect, useRef, useState } from 'react';

export const useDragThrottle = (initialValue: string | number | null, timeout = 100) => {
  const [value, setValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const setThrottleValue = (newValue: string | number | null) => {
    if (newValue === value) {
      clearTimeout(timeoutRef.current);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setValue(newValue);
    }, timeout);
  };

  return [value, setThrottleValue] as const;
};
