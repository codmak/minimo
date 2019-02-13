let uid = 0;

export default class Cake {
  constructor(option) {
    const { image, size, color, speedX = 0, speedY = 1, x = 0, y = 0 } = option;
    this.uid = ++uid;

    this.image = image;
    this.size = size;
    this.color = color;
    this.rotate = 0;

    this.speedX = speedX;
    this.speedY = speedY;

    this.holder = false;

    this.x = x;
    this.y = y;
  }
}
