import { mergeDeepRight } from 'ramda';
import Particle from './Particle';
import { changeColor } from '../util';

/**
 * @msg: 减速，减速量为 consume
 * @param {type}
 * @return: number
 */
function applyConsume(speed, consume) {
  if (Math.abs(speed) > 4) {
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
  }
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
      particleInfo: { size, number, random }
    } = option;

    const particles = [];
    for (let i = 0; i < number; i++) {
      particles.push(new Particle(width, height, size, random));
    }
    option.particles = particles;

    this.option = option;
  }

  drawPoint(point) {
    if (!point.needDraw) return;
    const {
      option: { ctx },
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

    ctx.fillStyle = `rgba(${point.color.r},${point.color.g},${point.color.b},${
      point.color.a
    })`;
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
        let color = checkImageData(index);
        if (color) {
          pxls.push([w, h, color]);
        }
      }
    }

    for (let i = 0; i < pxls.length && i < particles.length; i++) {
      let point = particles[i],
        X = pxls[i][0] - point.x,
        Y = pxls[i][1] - point.y;

      changeColor(point, 'r', pxls[i][2][0]);
      changeColor(point, 'g', pxls[i][2][1]);
      changeColor(point, 'b', pxls[i][2][2]);

      // 直线距离
      const T = Math.sqrt(X * X + Y * Y);
      // 获取与 x 轴的夹角
      const angle = Math.atan2(Y, X);
      // 设置圆点新值
      point.x += Math.cos(angle) * T * point.deltaX;
      point.y += Math.sin(angle) * T * point.deltaY;
      // 是否是文字的组成
      point.needDraw = true;
      // 画出该点
    }
  }

  explode() {
    const {
      mouse,
      key: { rebound },
      option: { width, height, constant, consume, particles }
    } = this;
    for (let i = 0, l = particles.length; i < l; i++) {
      const point = particles[i];

      // 获取与鼠标点下位置的相关信息
      let ax = mouse.x - point.x;
      let ay = mouse.y - point.y;
      let distance = Math.max(1, (ax * ax + ay * ay) / 64);
      let angle = Math.atan2(ay, ax);

      // 消耗掉一定量的速度
      point.pVelocityX = applyConsume(point.pVelocityX, 1 - consume);
      point.pVelocityY = applyConsume(point.pVelocityY, 1 - consume);

      // 边框反弹
      if (point.x < 2 * point.size) {
        point.pVelocityX = Math.abs(point.pVelocityX);
      }
      if (point.x > width - 2 * point.size) {
        point.pVelocityX = -Math.abs(point.pVelocityX);
      }
      if (point.y < 2 * point.size) {
        point.pVelocityY = Math.abs(point.pVelocityY);
      }
      if (point.y > height - 2 * point.size) {
        point.pVelocityY = -Math.abs(point.pVelocityY);
      }

      // 系数，作用于吸引或是弹开小球
      let polarity = 1;
      if (rebound) {
        polarity = -polarity;
      }

      // 计算下一次的速度，根据向心加速度
      point.pVelocityX += (polarity * (constant * Math.cos(angle))) / distance;
      point.pVelocityY += (polarity * (constant * Math.sin(angle))) / distance;

      // 计算下一次的位置
      point.x += point.pVelocityX;
      point.y += point.pVelocityY;
    }
  }

  freshPointInfo(paint, checkImageData, gutter = 4) {
    const {
      key: { explode },
      option: { ctx, width, height, particles }
    } = this;
    ctx.clearRect(0, 0, width, height);

    paint(ctx, width, height);

    const imgData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    if (explode) {
      this.explode();
    } else {
      particles.forEach(point => (point.needDraw = false));
      this.particleText(index => checkImageData(imgData, index), gutter);
    }
  }

  draw() {
    const { particles } = this.option;
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

  changeParticleInfo(particleInfo) {
    this.option.particles.forEach(particle => {
      if ('size' in particleInfo) {
        particle.changesize(particleInfo.size);
      }
    });
  }

  resetParticlePositon() {
    this.option.particles.forEach(particle => {
      particle.resetPosition();
    });
  }
}
