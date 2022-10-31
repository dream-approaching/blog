import React, { useRef } from 'react';
import useEventListener from './hooks';

export default function Component() {
  // Define button ref
  const buttonRef = useRef<HTMLButtonElement>(null);
  const documentRef = useRef<Document>(document);

  const onClick = (event: Event) => {
    console.log('button clicked!', event);
  };

  const onVisibilityChange = (event: Event) => {
    console.log('doc visibility changed!', {
      isVisible: !document.hidden,
      event,
    });
  };

  useEventListener('visibilitychange', onVisibilityChange, documentRef);

  useEventListener('click', onClick, buttonRef);

  return (
    <div>
      <button ref={buttonRef}>查看控制台打印信息</button>
    </div>
  );
}
