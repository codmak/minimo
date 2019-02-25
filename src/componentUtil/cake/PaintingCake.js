import Cake from './Cake';
import { createLoop, random } from '../../util';
import { getCakeColor } from './data/color';
import images from './data/image';

export default class PaintingCake {
  constructor(option) {
    this.option = option;
    this.cakes = [];
    this.cakeImages = [];
  }

  loadImage(urls) {
    return new Promise(resolve => {
      let loadNum = 0;
      let condition = () => {
        loadNum++;
        if (loadNum === urls.length) {
          resolve();
        }
      };
      for (let i = 0; i < urls.length; i++) {
        let image = new Image();
        image.src = urls[i];
        /* eslint-disable */
        image.onload = () => {
          this.cakeImages.push(image);
          condition();
        };
        /* eslint-enable */
        image.onerror = condition;
      }
    });
  }

  drawSingleCake(cake) {
    const { ctx } = this.option;

    let gradient = ctx.createRadialGradient(
      cake.x,
      cake.y,
      0,
      cake.x,
      cake.y,
      cake.size / 2
    );

    gradient.addColorStop(0, cake.color);
    gradient.addColorStop(0.3, cake.color);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(cake.x, cake.y, cake.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    var imageSize = (cake.size * 2) / 3;
    ctx.translate(cake.x, cake.y);
    ctx.rotate(cake.rotate);
    ctx.drawImage(
      cake.image,
      -imageSize / 2,
      -imageSize / 2,
      imageSize,
      imageSize
    );
    ctx.rotate(-cake.rotate);
    ctx.translate(-cake.x, -cake.y);
  }

  handleCakeInfo(cake) {
    const { width, height } = this.option;

    cake.x += cake.speedX;
    cake.y += cake.speedY;

    if (Math.abs(cake.speedX) > 0.1) {
      cake.speedX *= 0.99;
    } else {
      cake.speedX = 0;
    }

    if (Math.abs(cake.speedY) > 0.1) {
      cake.speedY *= 0.99;
    } else {
      cake.speedY = 0;
    }

    // 边框反弹，反弹消耗一定量的速度
    if (
      (cake.x < cake.size / 2 && cake.speedX < 0) ||
      (cake.x > width - cake.size / 2 && cake.speedX > 0)
    ) {
      cake.speedX *= -0.8;
    }
    if (
      (cake.y < cake.size / 2 && cake.speedY < 0) ||
      (cake.y > height - cake.size / 2 && cake.speedY > 0)
    ) {
      cake.speedY *= -0.8;
    }
  }

  draw() {
    const { ctx, width, height } = this.option;
    ctx.clearRect(0, 0, width, height);
    this.cakes.forEach(cake => {
      this.drawSingleCake(cake);
      this.handleCakeInfo(cake);
    });
  }

  start() {
    const { width } = this.option;
    this.loadImage(images).then(() => {
      clearTimeout(this.stopTimer);
      this.intervalTimer = setInterval(() => {
        let length = this.cakeImages.length;
        this.cakes.push(
          new Cake({
            image: this.cakeImages[random(length)],
            size: random(80, 30),
            color: getCakeColor(),
            speedX: random(50, -50),
            speedY: random(50, -50),
            x: random(width, 0),
            y: -100
          })
        );
      }, 1000);
      this.loop = createLoop(() => this.draw());
      this.loop.start();
    });
  }

  stop() {
    this.stopTimer = setTimeout(() => {
      this.loop.stop();
    }, 5000);
    clearInterval(this.intervalTimer);
  }

  more() {
    const { width } = this.option;
    let length = this.cakeImages.length;
    this.cakes.push(
      new Cake({
        image: this.cakeImages[random(length)],
        size: random(80, 30),
        color: getCakeColor(),
        speedX: random(50, -50),
        speedY: random(50, -50),
        x: random(width, 0),
        y: -100
      })
    );
  }
}
