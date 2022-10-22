import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import useInterval from './hooks';

const Timer = () => {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(1000);
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isPlaying ? delay : null,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? '暂停' : '点击开始自增'}</button>
      <p>
        <label htmlFor="delay">Delay: </label>
        <input type="number" name="delay" onChange={handleChange} value={delay} />
      </p>
    </>
  );
};

export default Timer;
