import React from 'react';
import './index.less';

export default function ImageOverlayHover() {
  return (
    <div>
      <figure className="hover-img">
        <img src="https://picsum.photos/id/200/440/320.jpg" />
        <figcaption>
          <h3>
            标题 <br />
            hover
          </h3>
        </figcaption>
      </figure>
    </div>
  );
}
