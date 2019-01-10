export default class Point {
  constructor(option) {
    const range = Math.random() * 360;
    const { width, height, size, random } = option;

    this.width = width;
    this.height = height;
    this.random = random;

    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 0.4
    };
    this.pColor = {
      ...this.color
    };
    this.deltaC = 0.05;

    // 移动速率
    this.deltaX = 0.5;
    this.deltaY = 0.5;

    // 开始的位置
    this.x = width / 2 + (Math.cos(range) * Math.random() * width) / 2;
    this.y = height / 2 + (Math.sin(range) * Math.random() * height) / 2;

    // 速度
    this.speedX = Math.floor(Math.random() * 10) - 5;
    this.speedY = Math.floor(Math.random() * 10) - 5;

    this.size = (random ? Math.random() : 1) * size;
    this.origSize = this.size;

    // 圆点是否形成文字
    this.needDraw = false;

    this.pathQueeu = new Queue(5, [this.x, this.y]);
  }

  changesize(size) {
    this.size = (this.random ? Math.random() : 1) * size;
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
}
