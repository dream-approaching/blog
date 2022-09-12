// @ts-nocheck

import React from 'react';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import WithPhotoSwipe from '../Hoc/withPhotoSwipe';

class PhotoSwiper extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      const galleryElements = document.getElementsByClassName('markdown')[0];
      if (galleryElements) {
        clearInterval(this.timer);
        this.imgs = document.querySelectorAll('li img');
        galleryElements.onclick = this.onThumbnailsClick;
      }
    }, 100);

    [...document.querySelectorAll(`img[alt='image']`)].map((item) => {
      const id = item.src.split('=')[1];
      item.className = 'lazyload';
      item.setAttribute('data-src', `http://taiji.zhengjinshou.cn/${id}`);
    });
  }
  render() {
    return null;
  }
}
export default WithPhotoSwipe(PhotoSwiper);
