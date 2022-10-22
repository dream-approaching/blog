import React from 'react';
import useBoolean from './hooks';

export default function Component() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <>
      <p>
        Value is <code>{value.toString()}</code>
      </p>
      <button onClick={setTrue}>set true</button>
      <button onClick={setFalse}>set false</button>
      <button onClick={toggle}>toggle</button>
    </>
  );
}
