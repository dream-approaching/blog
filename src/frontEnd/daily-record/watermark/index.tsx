import React from 'react';
import WaterMark from './watermark';

export default function Demo() {
  return (
    <div style={{ height: '250px', background: '#fff' }}>
      <div className="waterMarkWrap">
        <p>这是水印的容器，水印会覆盖在这个容器上</p>
        <p>创建一个canvas然后将canvas转成base64的图片再将图片作为背景图</p>
        <p>
          利用window.MutationObserver监听水印容器的dom变化，用户删除水印数据及修改熟悉时重新绘制
        </p>
        <p>需要加上样式 pointer-events:none; 禁止鼠标事件</p>
      </div>
      <WaterMark container=".waterMarkWrap" content="这是水印" />
    </div>
  );
}
