import Circle from './Circle';
import { createLoop } from '../../util';
import hexRgb from 'hex-rgb';

const colors = [
  '#aeecf8',
  '#dca3c9',
  '#dc6a77',
  '#f1a0bb',
  '#f5b8cf',
  '#e3e9d8',
  '#c5d6c5'
].map(item => hexRgb(item));

export default class PaintingBreath {
  constructor(option) {
    const {
      circleInfo: { number, maxSize }
    } = option;

    this.circles = [];
    for (let i = 0; i < number; i++) {
      this.circles.push(new Circle(maxSize / 2));
    }

    this.option = option;
    this.startIndex = 0;
    this.drawNew = false;
    this.stopTimer = null;
  }

  drawCircle(circle, color) {
    const { ctx, width, height } = this.option;
    if (!circle.show) return;
    ctx.fillStyle = `rgba(${color.red},${color.green},${color.blue},${(1 *
      (90 - circle.angle)) /
      90})`;
    ctx.beginPath();
    ctx.arc(
      width / 2,
      height / 2,
      Math.abs(circle.radius * Math.sin(circle.angle * (Math.PI / 180))),
      0,
      Math.PI * 2,
      true
    );

    ctx.closePath();
    ctx.fill();
    circle.angle += 0.2;
    if (circle.angle > 90) {
      circle.angle = 0;
      circle.show = false;
    }
  }

  clear(circle) {
    circle.angle = 0;
    circle.show = false;
  }

  painting() {
    const {
      circles,
      option: {
        ctx,
        width,
        height,
        circleInfo: { number, gutter }
      },
      drawNew
    } = this;
    ctx.clearRect(0, 0, width, height);
    if (drawNew && circles[this.startIndex].angle > gutter) {
      this.startIndex = (this.startIndex + 1) % number;
      circles[this.startIndex].show = true;
    }
    circles.forEach((circle, index) =>
      this.drawCircle(circle, colors[index % colors.length])
    );
  }

  start() {
    const { circles } = this;
    this.drawNew = true;
    circles[0].show = true;
    if (!this.loop) {
      this.loop = createLoop(() => this.painting());
    }
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }
    this.loop.start();
  }

  stop() {
    const { circles } = this;
    this.drawNew = false;

    const close = () => {
      this.stopTimer = setTimeout(() => {
        let showCircle = circles.filter(circle => circle.show);
        if (showCircle.length) {
          close();
        } else {
          this.loop.stop();
        }
      }, 1000);
    };

    close();
  }
}
