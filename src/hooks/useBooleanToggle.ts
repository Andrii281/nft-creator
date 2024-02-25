import { useState } from 'react';

export const useBooleanToggle = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (value?: boolean) => {
    setValue((prev) => {
      if (value !== undefined) return value;
      return !prev;
    });
  };

  return [value, toggle] as const;
};