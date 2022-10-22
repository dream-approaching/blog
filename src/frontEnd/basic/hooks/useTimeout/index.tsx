import React, { useState } from 'react';
import useTimeout from './hooks';

const Component = () => {
  const [visible, setVisible] = useState(false);
  const [delay, setDelay] = useState<null | number>(null);

  useTimeout(() => {
    setVisible(!visible);
  }, delay);

  return (
    <div>
      <button onClick={() => setDelay(visible ? 0 : 1000)}>
        {visible ? '点击隐藏' : '点击1秒后显示内容'}
      </button>
      {visible && <p>内容内容</p>}
    </div>
  );
};

export default Component;
