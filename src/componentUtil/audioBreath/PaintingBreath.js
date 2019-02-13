import Circle from './Circle';
import {createLoop} from '../../util';
import hexRgb from 'hex-rgb';

const colors = [
  '#f5b8cf',
  '#aeecf8',
  '#dca3c9',
  '#dc6a77',
  '#e3e9d8',
  '#f1a0bb',
  '#c5d6c5'
].map(item => hexRgb(item));

const getSizeByAngle = angle => Math.sqrt(Math.sin(angle * (Math.PI / 180)));

export default class PaintingBreath {
  constructor(option) {
    const {
      circleInfo: {number, maxSize}
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

  drawCircle(circle, nextCircle, color) {
    const {ctx, width, height} = this.option;
    if (!circle.show) return;
    let nowSize = Math.abs(circle.radius * getSizeByAngle(circle.angle));
    let nextSize = Math.abs(
      nextCircle.radius * getSizeByAngle(nextCircle.angle)
    );
    let gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      nowSize,
      width / 2,
      height / 2,
      nextSize
    );
    let opacity = (1 * (80 - circle.angle)) / 90;
    gradient.addColorStop(
      0,
      `rgba(${color.red},${color.green},${color.blue},${opacity})`
    );
    gradient.addColorStop(
      1,
      `rgba(${color.red},${color.green},${color.blue},${
        opacity > 0.3 ? opacity - 0.3 : 0
        })`
    );
    ctx.fillStyle = gradient;
    ctx.beginPath();

    ctx.arc(
      width / 2,
      height / 2,
      Math.abs(circle.radius * getSizeByAngle(circle.angle)),
      0,
      Math.PI * 2,
      true
    );

    ctx.arc(
      width / 2,
      height / 2,
      Math.abs(nextCircle.radius * getSizeByAngle(nextCircle.angle)),
      Math.PI * 2,
      0,
      false
    );

    ctx.closePath();
    ctx.fill();

    circle.angle += 0.1;
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
        circleInfo: {number, gutter}
      },
      drawNew
    } = this;
    ctx.clearRect(0, 0, width, height);
    if (drawNew && circles[this.startIndex].angle > gutter) {
      this.startIndex = (this.startIndex + 1) % number;
      circles[this.startIndex].show = true;
    }
    circles.forEach((circle, index) =>
      this.drawCircle(
        circle,
        circles[(index + circles.length + 1) % circles.length],
        colors[index % colors.length]
      )
    );
  }

  start() {
    const {circles} = this;
    this.drawNew = true;
    circles[this.startIndex].show = true;
    if (!this.loop) {
      this.loop = createLoop(() => this.painting());
    }
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }
    this.loop.start();
  }

  stop() {
    const {circles} = this;
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
