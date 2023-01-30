const DEFAULT_CONFIG = {
  width: '200', // canvas元素宽
  height: '100', // canvas元素高
  textAlign: 'left', // 文字对齐
  textBaseline: 'bottom', // 基准线
  font: '16px Microsoft Yahei', // 字体大小及样式
  fillStyle: '#000', // 自定义水印的颜色
  content: '', // 水印内容
  globalAlpha: 0.1, // 设置图形和图像透明度的值
  rotate: -16, // 文字旋转角度
  zIndex: 1000, // 元素堆叠顺序
};

// 画布水印容器的默认样式
const WATER_MARK_STYLE = `
      width:100%;
      height:100%;
      z-index: 100000;
      pointer-events:none;
      background-repeat:repeat;`;

class WaterMarkUtil {
  protected waterMarkConfig: typeof DEFAULT_CONFIG;
  protected waterMarkStyle: string;
  protected container: HTMLElement = document.body;
  protected canvas: HTMLCanvasElement = document.createElement('canvas');

  constructor(container: HTMLElement, options?: typeof DEFAULT_CONFIG) {
    this.waterMarkConfig = {
      ...DEFAULT_CONFIG,
      ...options,
    };
    this.waterMarkStyle = WATER_MARK_STYLE;
    // 这里将会保存一份水印容器的dom，用户恶意删除以后重新设置
    this.container = container;
  }

  waterMark(content: string) {
    const { width, height } = this.waterMarkConfig;
    this.waterMarkConfig = {
      ...this.waterMarkConfig,
      content: content,
    };
    this.createCanvas({
      width,
      height,
    });
    this.drawCanvas();
    this.appendCanvas();
  }

  /**
   *
   * @returns canvas
   */
  createCanvas({ width, height }: { width: string; height: string }) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    this.canvas = canvas;
  }

  drawCanvas() {
    const { globalAlpha, textAlign, textBaseline, font, fillStyle, content, rotate } =
      this.waterMarkConfig;
    const ctx = this.canvas.getContext('2d'); // 获取 canvas2d 上下文
    if (ctx) {
      ctx.globalAlpha = globalAlpha;
      ctx.textAlign = textAlign as CanvasTextAlign;
      ctx.textBaseline = textBaseline as CanvasTextBaseline;
      ctx.font = font;
      ctx.fillStyle = fillStyle;
      // 改变画布旋转中心点
      ctx.translate(50, 50);
      ctx.rotate((Math.PI * rotate) / 180);
      ctx.fillText(content, 0, 0);
      this.setBackGroupImg();
    }
  }

  setBackGroupImg() {
    try {
      this.waterMarkStyle = WATER_MARK_STYLE + ` background-image: url(${this.canvas.toDataURL()})`;
    } catch (error) {
      console.log('%c  error:', 'color: #0e93e0;background: #aaefe5;', '生成水印图片错误');
    }
  }

  appendCanvas() {
    const waterMarkWrapDom = document.querySelector('.waterMarkWrap');
    const watermarkDiv = waterMarkWrapDom || document.createElement('div');
    watermarkDiv.setAttribute('style', this.waterMarkStyle);
    watermarkDiv.classList.add('waterMarkWrap'); // 为元素添加“waterMarkWrap”类名
    if (!waterMarkWrapDom) {
      this.container.appendChild(watermarkDiv); // 添加元素
    }
    this.observerWaterMarkBox();
  }

  /**
   *@description 监听水印容器的dom变化，用户删除水印数据及修改熟悉时重新绘制
   * @param {水印容器} container
   */
  observerWaterMarkBox() {
    const _this = this;
    // @ts-ignore
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    // 检查浏览器是否支持这个API
    if (MutationObserver) {
      let mo = new MutationObserver(() => {
        const waterMarkWrapDom = document.querySelector('.waterMarkWrap');
        // 防止用户删除水印元素以及修改元素属性
        if (
          !waterMarkWrapDom ||
          (waterMarkWrapDom && waterMarkWrapDom.getAttribute('style') !== this.waterMarkStyle)
        ) {
          // 避免一直触发
          mo.disconnect();
          mo = null as any;
          _this.waterMark(_this.waterMarkConfig.content);
        }
      });
      mo.observe(this.container, {
        attributes: true, // 观察目标节点的属性节点
        subtree: true, // 观察目标节点的所有后代节点
        childList: true, // 观察目标节点的子节点
      });
    }
  }
}
export default WaterMarkUtil;
