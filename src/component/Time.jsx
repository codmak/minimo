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
    const { width = 400, height = 100 } = this.props;
    const canvas = this.canvas.current;

    this.time = new CanvasParticle({
      canvas,
      width,
      height,
      particleColor: 'hsla(0, 0%, 0%, .6)',
      textSize: 80,
      num: 800,
      gutter: 4,
      size: 6,
      getText() {
        return getTimeStr(true);
      }
    });

    this.time.loop();
  }

  render() {
    const { position, width = 400, height = 100 } = this.props;
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
        <canvas ref={this.canvas} id="time-canvas" />
      </div>
    );
  }
}

export default Time;
