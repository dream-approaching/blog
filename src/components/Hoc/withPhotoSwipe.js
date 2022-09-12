// @ts-nocheck
import React from 'react';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import 'photoswipe/dist/default-skin/default-skin.css';
import 'photoswipe/dist/photoswipe.css';

const withPhotoSwipe = (Component) => {
  class Hoc extends Component {
    getNaturalWidth = (img) => {
      const image = new Image();
      image.src = img.src;
      const naturalWidth = image.width;
      const naturalHeight = image.height;
      return { naturalWidth, naturalHeight };
    };

    // find nearest parent element
    closest = (el, fn) => {
      return el && (fn(el) ? el : this.closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    onThumbnailsClick = (e) => {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      const eTarget = e.target || e.srcElement;

      // find root element of slide
      const clickedListItem = this.closest(eTarget, function (el) {
        return el.tagName && el.tagName.toUpperCase() === 'IMG';
      });

      if (!clickedListItem) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      let index;
      for (let i = 0; i < this.imgs.length; i++) {
        if (this.imgs[i] === clickedListItem) {
          index = i;
          break;
        }
      }

      if (index >= 0) {
        // open PhotoSwipe if valid index found
        this.openPhotoSwipe(index);
      }
      return false;
    };

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    parseThumbnailElements = () => {
      const items = [];
      let imgEl;
      let item;

      for (let i = 0; i < this.imgs.length; i++) {
        imgEl = this.imgs[i]; // <img> element

        // create slide object
        item = {
          src: imgEl.getAttribute('src'),
          w: this.getNaturalWidth(imgEl).naturalWidth,
          h: this.getNaturalWidth(imgEl).naturalHeight,
        };

        item.msrc = imgEl.getAttribute('src');
        if (imgEl.parentNode.innerText) {
          item.title = `${i + 1}、${imgEl.parentNode.innerText}`;
        }
        item.el = imgEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    openPhotoSwipe = (imgIndex, disableAnimation) => {
      const pswpElement = document.querySelectorAll('.pswp')[0];

      const items = this.parseThumbnailElements();

      // define options (if needed)
      const options = {
        // 关键动画效果
        getThumbBoundsFn: (index) => {
          // See Options -> getThumbBoundsFn section of documentation for more info

          const thumbnail = items[index].el; // find thumbnail
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          const rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        tapToClose: true,
        tapToToggleControls: false,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        closeEl: false,
      };

      options.index = parseInt(imgIndex, 10);

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      // eslint-disable-next-line
      const gallery = new PhotoSwipe(
        pswpElement,
        // eslint-disable-next-line
        PhotoSwipeUI_Default,
        items,
        options,
      );
      gallery.init();
    };

    render() {
      console.log('123', 123);
      return (
        <>
          <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="pswp__bg"></div>
            <div className="pswp__scroll-wrap">
              <div className="pswp__container">
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
                <div className="pswp__item"></div>
              </div>
              <div className="pswp__ui pswp__ui--hidden">
                <div className="pswp__top-bar">
                  <div className="pswp__counter"></div>
                  <div className="pswp__preloader">
                    <div className="pswp__preloader__icn">
                      <div className="pswp__preloader__cut">
                        <div className="pswp__preloader__donut"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div className="pswp__share-tooltip"></div>
                </div>

                <button
                  className="pswp__button pswp__button--arrow--left"
                  title="Previous (arrow left)"
                ></button>

                <button
                  className="pswp__button pswp__button--arrow--right"
                  title="Next (arrow right)"
                ></button>

                <div className="pswp__caption">
                  <div
                    style={{ fontSize: 15, marginBottom: 10 }}
                    className="pswp__caption__center"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {super.render()}
        </>
      );
    }
  }

  // 约定：包装显示名字以便于调试
  Hoc.displayName = `withPhotoSwipe(${Component.displayName || Component.name || 'Component'})`;

  return Hoc;
};

export default withPhotoSwipe;
