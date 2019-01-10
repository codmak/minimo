import { mergeDeepRight } from 'ramda';
import Point from './Point';
import { changeColor } from '../../util';

const mergeOption = mergeDeepRight({
  width: 400,
  height: 400,
  constant: 20,
  particleInfo: {
    size: 20,
    color: 'rgba(0, 0, 0, .6)',
    number: 800,
    random: true
  }
});

export default class Base {
  constructor(option) {
    this.key = {
      // 吸引或是弹开条件
      rebound: false,
      // 鼠标按下爆炸
      explode: false,
      // 圆点变大
      bigger: false,
      // 圆点抖动
      shake: false
    };
    // 鼠标信息
    this.mouse = {
      x: 0,
      y: 0
    };

    option = mergeOption(option);
    const {
      width,
      height,
      particleInfo: { size, number, random }
    } = option;

    this.points = [];
    for (let i = 0; i < number; i++) {
      this.points.push(new Point({ width, height, size, random }));
    }

    this.option = option;
  }

  // 根据 point 画点，仅是画点，不包含边框反弹等逻辑处理
  drawPoint(point) {
    if (!point.needDraw) return;
    const {
      option: { ctx },
      key: { bigger }
    } = this;

    // 圆点变大
    if (bigger) {
      point.size = point.size + 0.03;
    } else {
      var newSize = point.size - 0.06;
      if (newSize > point.origSize && newSize > 0) {
        point.size = newSize;
      } else {
        point.size = point.origSize;
      }
    }

    ctx.fillStyle = `rgba(${point.color.r},${point.color.g},${point.color.b},${
      point.color.a
    })`;

    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // 画出轨迹
    point.pathQueeu.forEach(([x, y], index) => {
      let size = Math.max(0, point.size - (index + 1) * 1.4);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    });
  }

  // 处理边框反弹逻辑
  handlePointInfo(point) {
    const {
      option: { width, height }
    } = this;

    point.pathQueeu.push([point.x, point.y]);

    point.x += point.speedX;
    point.y += point.speedY;

    // 边框反弹
    if (point.x < 2 * point.size) {
      point.speedX = Math.abs(point.speedX);
    }
    if (point.x > width - 2 * point.size) {
      point.speedX = -Math.abs(point.speedX);
    }
    if (point.y < 2 * point.size) {
      point.speedY = Math.abs(point.speedY);
    }
    if (point.y > height - 2 * point.size) {
      point.speedY = -Math.abs(point.speedY);
    }
  }

  particleText(checkImageData, gutter) {
    const {
      option: { width, height },
      points
    } = this;
    // 获取图片中有文字的区域
    const pxls = [];
    for (let w = 0; w < width; w += gutter) {
      for (let h = 0; h < height; h += gutter) {
        let index = (w + h * width) * 4;
        let color = checkImageData(index);
        if (color) {
          pxls.push([w, h, color]);
        }
      }
    }

    for (let i = 0; i < pxls.length && i < points.length; i++) {
      let point = points[i],
        X = pxls[i][0] - point.x,
        Y = pxls[i][1] - point.y;

      changeColor(point, 'r', pxls[i][2][0]);
      changeColor(point, 'g', pxls[i][2][1]);
      changeColor(point, 'b', pxls[i][2][2]);

      // 直线距离
      const T = Math.sqrt(X * X + Y * Y);

      // 获取与 x 轴的夹角
      const angle = Math.atan2(Y, X);

      point.speedX = Math.cos(angle) * T * point.deltaX;
      point.speedY = Math.sin(angle) * T * point.deltaY;

      // 是否是文字的组成
      point.needDraw = true;

      // 画出该点
      this.handlePointInfo(point);
    }
  }

  explode() {
    const {
      mouse,
      key: { rebound },
      option: { constant },
      points
    } = this;
    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      if (!points[i].needDraw) break;

      // 获取与鼠标点下位置的相关信息
      let ax = mouse.x - point.x;
      let ay = mouse.y - point.y;
      let distance = Math.sqrt(ax * ax + ay * ay);
      let angle = Math.atan2(ay, ax);

      // 系数，作用于吸引或是弹开小球
      let polarity = 1;
      if (rebound) {
        polarity = -polarity;
      }

      let acceleration = (polarity * constant) / distance;

      point.speedX += acceleration * Math.cos(angle);
      point.speedY += acceleration * Math.sin(angle);

      this.handlePointInfo(point);
    }
  }

  // 绘画
  painting(gutter) {
    const {
      key: { explode },
      option: { ctx, width, height },
      points
    } = this;
    ctx.clearRect(0, 0, width, height);

    if (explode) {
      this.explode();
    } else {
      this.paintingText(ctx, width, height);

      const imgData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      points.forEach(point => (point.needDraw = false));
      this.particleText(index => this.checkImageData(imgData, index), gutter);
    }
  }

  paintingText() {}

  checkImageData() {}

  draw() {
    const { points } = this;
    points.forEach(point => this.drawPoint(point));
  }

  resetExplode() {
    const { points } = this;
    points.forEach(point => {
      point.speedX = Math.floor(Math.random() * 10) - 5;
      point.speedY = Math.floor(Math.random() * 10) - 5;
    });
  }

  resetSize({ width, height }) {
    this.option.width = width;
    this.option.height = height;
  }

  setKeys(keys) {
    this.key = {
      ...this.key,
      ...keys
    };
  }

  setMouse(mouse) {
    this.mouse = {
      ...this.mouse,
      ...mouse
    };
  }

  changeParticleInfo(particleInfo) {
    this.points.forEach(point => {
      if ('size' in particleInfo) {
        point.changesize(particleInfo.size);
      }
    });
  }

  resetParticlePositon() {
    this.points.forEach(point => {
      point.resetPosition();
    });
  }
}
