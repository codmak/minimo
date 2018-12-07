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

function getCoordinates(e, canvas) {
  if (e.offsetX) {
    return { x: e.offsetX, y: e.offsetY }; // use offset if available
  } else if (e.layerX) {
    return { x: e.layerX, y: e.layerY }; // firefox... make sure to position the canvas
  } else {
    // iOS. Maybe others too?
    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop
    };
  }
}

class Time extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.time = null;
  }

  componentDidMount() {
    const { width = 400, height = 400 } = this.props;
    const canvas = this.canvas.current;

    this.time = new CanvasParticle({
      canvas,
      width,
      height,
      particleColor: 'hsla(0, 0%, 0%, .6)',
      num: 800,
      textSize: 80,
      gutter: 4,
      size: 6,
      getText() {
        return getTimeStr(true);
      },
      consume: 0.02,
      constant: 4
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
  }

  mergeOption(option) {
    this.time.set(option);
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
    const { position, width = 400, height = 400 } = this.props;
    let style = {};
    if (position) {
      style = {
        position: 'absolute',
        ...position,
        width,
        height
      };
    }
    return (
      <div className="time" style={style}>
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

export default Time;
