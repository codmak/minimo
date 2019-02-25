import { random } from '../../util';

export default class Particle {
  constructor(option) {
    const range = Math.random() * 360;
    const { width, height, size, random: sizeRandom, deltaC = 0.1 } = option;

    // 颜色
    this.color = {
      r: 0,
      g: 0,
      b: 0,
      a: 0.4
    };
    this.pColor = {
      ...this.color
    };
    this.dColor = {
      ...this.color
    };
    // 颜色变化的速率
    this.deltaC = deltaC;

    // 移动速率
    this.delta = 0.2;

    // 开始的位置
    this.x = width / 2 + (Math.cos(range) * Math.random() * width) / 2;
    this.y = height / 2 + (Math.sin(range) * Math.random() * height) / 2;

    this.dx = 0;
    this.dy = 0;

    // 速度
    this.speedX = random(5, -5, { decimal: true });
    this.speedY = random(5, -5, { decimal: true });

    this.size = sizeRandom ? random(size, 1, { include: true }) : size;
    this.origSize = this.size;

    // 圆点是否形成文字
    this.needDraw = false;

    // 轨迹位置
    this.pathQueeu = new Queue(5, [this.x, this.y]);

    this.option = option;
  }

  changeSize(size) {
    this.size = this.option.random
      ? random(size, size / 2, { include: true })
      : size;
    this.origSize = this.size;
  }
}

class Queue {
  constructor(number, initValue) {
    this.queue = [];
    for (let i = 0; i < number; i++) {
      this.queue.push(initValue);
    }
  }

  push(value) {
    this.queue.pop();
    this.queue.unshift(value);
  }

  forEach(fn) {
    this.queue.forEach(fn);
  }

  needPush(x, y) {
    return !(x === this.queue[0][0] && y === this.queue[0][1]);
  }
}
