---
title: 金刚捣碓
nav:
  title: 太极
group:
  title: 陈式太极拳83式
---

```tsx | inline
import React from 'react';
import { Video } from 'blog';

export default () => {
  console.log('%c zjs Video:', 'color: #fff;background: #b457ff;', Video);
  return (
    <Video
      title="正常"
      url="https://6465-dev-vza4u-1302956475.tcb.qcloud.la/83/jingangdaodui2/video_attack.mp4?sign=70c43b6a2ac302ee7377e569176b594f&t=1662946308"
      videoInfo={{ shotName: '吴少华', shotTime: '2019年11月25日' }}
    />
  );
};
```
