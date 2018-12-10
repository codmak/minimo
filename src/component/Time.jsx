import React, { Component } from 'react';
import CanvasParticle from '../canvas/CanvasParticle';

function pad(number) {
  return ('0' + number).substr(-2);
}

function getTimeStr(amPM) {
  var date = new Date(),
    hours = date.getHours();

  if (amPM) {
    hours = hours > 12 ? (hours -= 12) : hours;
    hours = hours === 0 ? 12 : hours;
  } else {
    hours = pad(hours);
  }

  var minutes = pad(date.getMinutes());
  var seconds = pad(date.getSeconds());
  return hours + ' : ' + minutes + ' : ' + seconds;
}

class Time extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.time = null;
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    const { width = 400, height = 400 } = document.body.getBoundingClientRect();

    this.time = new CanvasParticle({
      canvas,
      width,
      height,
      textSize: 80, // 文字大小
      particleColor: 'hsla(0, 0%, 0%, .6)', // 圆点颜色
      num: 800, // 圆点数量
      gutter: 4, // 获取定位点的间隔像素
      size: 6, // 圆点大小
      // 图像文字的获取方法
      getText() {
        return getTimeStr(true);
      },
      consume: 0.01, // 每次圆点运动的消耗量
      constant: 4 // 引力常量，用于远端的速度计算
    });

    this.time.loop();

    canvas.addEventListener('mousedown', e => {
      this.mouseOption({ press: true }, e);
    });
    canvas.addEventListener('mousemove', e => {
      this.mouseOption({}, e);
    });
    document.addEventListener('mouseup', e => {
      this.time.resetExplode();
      this.mouseOption({ press: false }, e);
    });
    document.addEventListener('keydown', e => {
      let key = {};
      switch (e.keyCode) {
        case 16:
          key.shift = true;
          break;
        case 38:
          key.up = true;
          break;
        case 32:
          key.space = true;
          break;
        default:
      }
      this.mergeOption({ key });
    });
    document.addEventListener('keyup', e => {
      let key = { shift: false };
      switch (e.keyCode) {
        case 16:
          key.shift = false;
          break;
        case 38:
          key.up = false;
          break;
        case 32:
          key.space = false;
          break;
        default:
      }
      this.mergeOption({ key });
    });
    window.addEventListener('resize', e => {
      const { width, height } = document.body.getBoundingClientRect();
      this.resizeCanvas({ width, height });
    });
  }

  mergeOption(option) {
    this.time.set(option);
  }

  resizeCanvas(size) {
    this.time.resetSize(size);
  }

  mouseOption(option, e) {
    const canvasPosi = this.canvas.current.getBoundingClientRect();
    this.mergeOption({
      ...option,
      mouse: {
        x: e.pageX - canvasPosi.left,
        y: e.pageY - canvasPosi.top
      }
    });
  }

  render() {
    return (
      <div className="time">
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default Time;
