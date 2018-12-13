export default class Particle {
  constructor(width, height, size, random) {
    const range = Math.random() * 360;

    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 0.6
    };
    this.pColor = {
      ...this.color
    };
    this.deltaC = 0.1;

    // 移动速率
    this.deltaX = 0.15;
    this.deltaY = 0.15;

    this.x = 0;
    this.y = 0;

    // 开始的位置
    this.px = width / 2 + (Math.cos(range) * width) / 2;
    this.py = height / 2 + (Math.sin(range) * height) / 2;

    // 速度
    this.velocityX = Math.floor(Math.random() * 10) - 5;
    this.velocityY = Math.floor(Math.random() * 10) - 5;
    this.pVelocityX = this.velocityX;
    this.pVelocityY = this.velocityY;

    // 消耗量
    this.consume = 1;

    this.size = (random ? Math.random() : 1) * size;
    this.origSize = this.size;

    // 圆点是否形成文字
    this.inText = false;
  }
}
