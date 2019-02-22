import { random } from '../../util';

export default class Particle {
  constructor(option) {
    const range = Math.random() * 360;
    const { width, height, size, random: sizeRandom } = option;

    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 0.4
    };
    this.pColor = {
      ...this.color
    };
    this.dColor = {
      ...this.color
    };
    this.deltaC = 0.1;

    // 移动速率
    this.delta = 0.2;

    // 开始的位置
    this.x = width / 2 + (Math.cos(range) * Math.random() * width) / 2;
    this.y = height / 2 + (Math.sin(range) * Math.random() * height) / 2;

    this.dx = 0;
    this.dy = 0;

    // 速度
    this.speedX = Math.floor(Math.random() * 10) - 5;
    this.speedY = Math.floor(Math.random() * 10) - 5;

    this.size = sizeRandom ? random(size, 1, true) : size;
    this.origSize = this.size;

    // 圆点是否形成文字
    this.needDraw = false;

    // 轨迹位置
    this.pathQueeu = new Queue(5, [this.x, this.y]);

    this.option = option;
  }

  changeSize(size) {
    this.size = this.option.random ? random(size, size / 2, true) : size;
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

  needPush() {
    let last = this.queue.length;
    return !(
      this.queue[0][0] === this.queue[last][0] &&
      this.queue[0][1] === this.queue[last][1]
    );
  }
}
