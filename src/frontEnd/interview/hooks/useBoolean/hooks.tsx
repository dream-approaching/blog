import { useCallback, useState } from 'react';

interface UseBooleanOutput {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue?: boolean): UseBooleanOutput {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return { value, setTrue, setFalse, toggle };
}
