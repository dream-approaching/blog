import React, { useEffect, memo, useState } from 'react';
import WaterMarkUtil from './waterMarkUtil';

const WaterMark = (props: { content: string; container: any }) => {
  const [waterMarkInstance, setWaterMarkInstance] = useState<WaterMarkUtil>();
  const { content, container } = props;

  useEffect(() => {
    try {
      const containerDom = document.querySelector(container);
      if (!containerDom) console.error(container + ': 不是合法的元素选择器');
      else {
        const waterMarkInstance = new WaterMarkUtil(containerDom);
        setWaterMarkInstance(waterMarkInstance);
      }
    } catch (error) {
      console.log('%c  error:', 'color: #0e93e0;background: #aaefe5;', error);
    }
  }, [container]);

  useEffect(() => {
    content && waterMarkInstance && waterMarkInstance.waterMark(content);
  }, [waterMarkInstance, content]);

  return <></>;
};

export default memo(WaterMark);
