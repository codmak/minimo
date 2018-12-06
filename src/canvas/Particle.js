export default class Particle {
  constructor(width, height, size) {
    const range = Math.random() * 180;

    // 移动速率
    this.delta = 0.25;
    this.x = 0;
    this.y = 0;

    // 开始的位置
    this.px = width / 2 + (Math.cos(range) * width) / 2;
    this.py = height / 2 + (Math.sin(range) * height) / 2;

    // 扩散的幅度
    this.velocityX = Math.floor(Math.random() * 10) - 5;
    this.velocityY = Math.floor(Math.random() * 10) - 5;

    this.size = Math.random() * size;
    this.origSize = size;

    // 圆点是否形成文字
    this.inText = false;
  }
}
