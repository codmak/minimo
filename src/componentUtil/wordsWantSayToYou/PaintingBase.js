import { mergeDeepRight } from 'ramda';
import Particle from './Particle';
import { changeColor } from '../../util';

const mergeOption = mergeDeepRight({
  width: 400,
  height: 400,
  constant: 20,
  particleInfo: {
    size: 10,
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

    this.particles = [];
    for (let i = 0; i < number; i++) {
      this.particles.push(new Particle({ width, height, size, random }));
    }

    this.option = option;
  }

  // 根据 particle 画点，仅是画点，不包含边框反弹等逻辑处理
  drawParticle(particle) {
    if (!particle.needDraw) return;
    const {
      option: { ctx },
      key: { bigger }
    } = this;

    // 圆点变大
    if (bigger) {
      particle.size = particle.size + 0.03;
    } else {
      var newSize = particle.size - 0.06;
      if (newSize > particle.origSize && newSize > 0) {
        particle.size = newSize;
      } else {
        particle.size = particle.origSize;
      }
    }

    ctx.fillStyle = `rgba(${particle.color.r},${particle.color.g},${
      particle.color.b
    },${particle.color.a})`;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // 画出轨迹
    particle.pathQueeu.forEach(([x, y], index) => {
      let size = Math.max(0, particle.size - (index + 1) * 1.4);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    });
  }

  // 处理圆点速度包括边框反弹
  handleParticleInfo(particle) {
    const {
      option: { width, height }
    } = this;

    particle.pathQueeu.push([particle.x, particle.y]);

    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // 边框反弹
    if (particle.x < 2 * particle.size) {
      particle.speedX = Math.abs(particle.speedX);
    }
    if (particle.x > width - 2 * particle.size) {
      particle.speedX = -Math.abs(particle.speedX);
    }
    if (particle.y < 2 * particle.size) {
      particle.speedY = Math.abs(particle.speedY);
    }
    if (particle.y > height - 2 * particle.size) {
      particle.speedY = -Math.abs(particle.speedY);
    }
  }

  getParticleInfo(checkImageData, gutter) {
    const {
      option: { width, height },
      particles
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

    for (let i = 0; i < pxls.length && i < particles.length; i++) {
      let particle = particles[i],
        X = pxls[i][0] - particle.x,
        Y = pxls[i][1] - particle.y;

      changeColor(particle, 'r', pxls[i][2][0]);
      changeColor(particle, 'g', pxls[i][2][1]);
      changeColor(particle, 'b', pxls[i][2][2]);

      // 直线距离
      const T = Math.sqrt(X * X + Y * Y);

      // 获取与 x 轴的夹角
      const angle = Math.atan2(Y, X);

      particle.speedX = Math.cos(angle) * T * particle.delta;
      particle.speedY = Math.sin(angle) * T * particle.delta;

      // 是否是文字的组成
      particle.needDraw = true;

      this.handleParticleInfo(particle);
    }
  }

  explode() {
    const {
      mouse,
      key: { rebound },
      option: { constant },
      particles
    } = this;
    for (let i = 0, l = particles.length; i < l; i++) {
      const particle = particles[i];
      if (!particles[i].needDraw) break;

      // 获取与鼠标点下位置的相关信息
      let ax = mouse.x - particle.x;
      let ay = mouse.y - particle.y;
      let distance = Math.sqrt(ax * ax + ay * ay);
      let angle = Math.atan2(ay, ax);

      // 系数，作用于吸引或是弹开小球
      let polarity = 1;
      if (rebound) {
        polarity = -polarity;
      }

      let acceleration = (polarity * constant) / distance;

      particle.speedX += acceleration * Math.cos(angle);
      particle.speedY += acceleration * Math.sin(angle);

      this.handleParticleInfo(particle);
    }
  }

  // 绘画
  painting(gutter) {
    const {
      key: { explode },
      option: { ctx, width, height },
      particles
    } = this;
    ctx.clearRect(0, 0, width, height);

    if (explode) {
      this.explode();
    } else {
      this.paintingText(ctx, width, height);

      const imgData = ctx.getImageData(0, 0, width, height);
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => (particle.needDraw = false));
      this.getParticleInfo(
        index => this.checkImageData(imgData, index),
        gutter
      );
    }
  }

  // 继承该对象时需要覆盖该方法，该方法用于在画布上绘画
  paintingText() {}

  // 继承可覆盖该方法，用于自定义获取图片中的点的
  checkImageData(imgData, index) {
    return imgData.data[index + 3] !== 0
      ? [imgData.data[index], imgData.data[index + 1], imgData.data[index + 2]]
      : null;
  }

  draw() {
    const { particles } = this;
    particles.forEach(particle => this.drawParticle(particle));
  }

  resetExplode() {
    const { particles } = this;
    particles.forEach(particle => {
      particle.speedX = Math.floor(Math.random() * 10) - 5;
      particle.speedY = Math.floor(Math.random() * 10) - 5;
    });
  }

  resetSize({ width, height }) {
    this.option.width = width;
    this.option.height = height;
  }

  setKeys(key) {
    this.key = {
      ...this.key,
      ...key
    };
  }

  setMouse(mouse) {
    this.mouse = {
      ...this.mouse,
      ...mouse
    };
  }

  changeParticleInfo(particleInfo) {
    this.particles.forEach(particle => {
      if ('size' in particleInfo) {
        particle.changeSize(particleInfo.size);
      }
    });
  }

  resetParticlePositon() {
    this.particles.forEach(particle => {
      particle.resetPosition();
    });
  }
}
