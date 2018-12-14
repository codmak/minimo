export default class Particle {
  constructor(width, height, size, random) {
    const range = Math.random() * 360;

    this.width = width;
    this.height = height;
    this.random = random;

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
    this.deltaX = 0.25;
    this.deltaY = 0.25;

    // 开始的位置
    this.x = width / 2 + (Math.cos(range) * Math.random() * width) / 2;
    this.y = height / 2 + (Math.sin(range) * Math.random() * height) / 2;

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

  changesize(size) {
    this.size = (this.random ? Math.random() : 1) * size;
    this.origSize = this.size;
  }

  resetPosition() {
    const { width, height } = this;
    const range = Math.random() * 360;
    this.x = width / 2 + (Math.cos(range) * Math.random() * width) / 2;
    this.y = height / 2 + (Math.sin(range) * Math.random() * height) / 2;
  }
}
