import { mergeDeepRight } from 'ramda';
import Particle from './Particle';

/**
 * @msg: 减速，减速量为 consume
 * @param {type}
 * @return: number
 */
function applyConsume(speed, consume) {
  if (speed > 10) {
    return speed * consume;
  }
  return speed;
}

const mergeOption = mergeDeepRight({
  width: 400,
  height: 400,
  constant: 20,
  consume: 0.01,
  particleInfo: {
    size: 6,
    color: 'rgba(0, 0, 0, .6)',
    number: 800,
    random: true
  },
  particles: []
});

export default class Base {
  constructor(option) {
    this.key = {
      rebound: false,
      explode: false,
      bigger: false,
      shake: false
    };
    this.mouse = {
      x: 0,
      y: 0
    };

    option = mergeOption(option);
    const {
      width,
      height,
      particleInfo: { size, number, random },
      particles
    } = option;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    option.canvas = canvas;
    option.ctx = canvas.getContext('2d');

    for (let i = 0; i < number; i++) {
      particles.push(new Particle(width, height, size, random));
    }

    this.option = option;
  }

  drawPoint(point) {
    if (!point.inText) return;
    const {
      option: {
        ctx,
        particleInfo: { color }
      },
      key: { bigger, shake }
    } = this;
    // 按下向上按钮，圆点变大
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

    ctx.fillStyle = color;
    console.log(color)
    ctx.beginPath();

    // 按下空格，圆点开始抖动
    if (shake) {
      ctx.arc(
        point.x + (Math.random() - 0.5) * 6,
        point.y + (Math.random() - 0.5) * 6,
        point.size,
        0,
        Math.PI * 2,
        true
      );
    } else {
      console.log('draw')
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2, true);
    }
    ctx.closePath();
    ctx.fill();
  }

  particleText(checkImageData, gutter = 4) {
    const { width, height, particles } = this.option;
    // 获取图片中有文字的区域
    const pxls = [];
    for (let w = 0; w < width; w += gutter) {
      for (let h = 0; h < height; h += gutter) {
        let index = (w + h * width) * 4;
        if (checkImageData(index)) {
          pxls.push([w, h]);
        }
      }
    }

    for (let i = 0; i < pxls.length && i < particles.length; i++) {
      let point = particles[i],
        X,
        Y;

      X = pxls[i][0] - point.px;
      Y = pxls[i][1] - point.py;

      // 直线距离
      const T = Math.sqrt(X * X + Y * Y);
      // 获取与 x 轴的夹角
      const angle = Math.atan2(Y, X);
      // 设置圆点新值
      point.x = point.px + Math.cos(angle) * T * Math.abs(point.deltaX);
      point.y = point.py + Math.sin(angle) * T * Math.abs(point.deltaY);
      // 用新值代替起始位置
      point.px = point.x;
      point.py = point.y;
      // 是否是文字的组成
      point.inText = true;
      // 画出该点
    }
  }

  explode() {
    const {
      mouse,
      key: { rebound },
      option: { canvas, width, height, constant, consume, particles }
    } = this;
    for (let i = 0, l = particles.length; i < l; i++) {
      const point = particles[i];

      // 判断是否是文字的组成
      if (point.inText) {
        // 获取与鼠标点下位置的相关信息
        let ax = mouse.x - point.px;
        let ay = mouse.y - point.py;
        let distance = Math.max(1, (ax * ax + ay * ay) / 64);
        let angle = Math.atan2(ay, ax);

        // 消耗掉一定量的速度
        point.pVelocityX = applyConsume(point.pVelocityX, 1 - consume);
        point.pVelocityY = applyConsume(point.pVelocityY, 1 - consume);

        // 边框反弹
        if (point.px < 2 * point.size) {
          point.pVelocityX = Math.abs(point.pVelocityX);
        }
        if (point.px > width - 2 * point.size) {
          point.pVelocityX = -Math.abs(point.pVelocityX);
        }
        if (point.py < 2 * point.size) {
          point.pVelocityY = Math.abs(point.pVelocityY);
        }
        if (point.py > height - 2 * point.size) {
          point.pVelocityY = -Math.abs(point.pVelocityY);
        }

        // 系数，作用于吸引或是弹开小球
        let polarity = 1;
        if (rebound) {
          polarity = -polarity;
        }

        // 计算下一次的速度，根据向心加速度
        point.pVelocityX +=
          (polarity * (constant * Math.cos(angle))) / distance;
        point.pVelocityY +=
          (polarity * (constant * Math.sin(angle))) / distance;

        // 计算下一次的位置
        point.x = point.px + point.pVelocityX;
        point.y = point.py + point.pVelocityY;

        point.px = point.x;
        point.py = point.y;

        this.drawPoint(point);
      }
    }
    return canvas;
  }

  draw(paint, checkImageData, gutter = 4) {
    const {
      key: { explode },
      option: { ctx, width, height }
    } = this;
    ctx.clearRect(0, 0, width, height);
    paint(ctx, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    if (explode) {
      this.explode();
    } else {
      this.particleText(index => checkImageData(imgData, index), gutter);
    }
  }

  paint() {
    const { particles } = this.option;
    console.log(23123);
    particles.forEach(point => this.drawPoint(point));
  }

  resetExplode() {
    const { particles } = this.option;
    particles.forEach(point => {
      point.pVelocityX = point.velocityX;
      point.pVelocityY = point.velocityY;
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
}
