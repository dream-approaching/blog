import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import useDebounce from './hooks';

export default function Component() {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    console.log('这里处理请求');
  }, [debouncedValue]);

  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
}
