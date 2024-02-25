import { useEffect, useRef, useState } from 'react';

export const useDragOver = (initialValue: boolean, timeout = 100) => {
  const [value, setValue] = useState<boolean>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const setDragOver = (isDragging: boolean) => {
    if (!isDragging) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setValue(false);
      }, timeout);

      return;
    }

    clearTimeout(timeoutRef.current);

    if (value === isDragging) return;

    setValue(true);
  };

  return [value, setDragOver] as const;
};
