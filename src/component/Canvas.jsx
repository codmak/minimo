import React, { Component } from 'react';
import CanvasTime from '../canvas/Time';
import { CanvasCenterText } from '../canvas/Text';
import { createLoop } from '../util';

class Canvas extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.paintings = {};
    this.loop = null;
  }

  componentDidMount = () => {
    const canvas = this.canvas.current;
    const { width, height } = this.canvas.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    this.paintings.time = new CanvasTime(
      {
        ctx,
        width,
        height
      },
      {
        color: 'rgb(42,35,75)'
      }
    );

    this.paintings.text = new CanvasCenterText(
      {
        ctx,
        width,
        height
      },
      {
        array: ['READY?', 'READY!'],
        colors: ['rgba(94,83,117)', 'rgba(52,45,69)']
      }
    );

    setTimeout(() => {
      this.paintings.time.changeTextOption({
        color: 'rgb(254,67,101)'
      });
      this.paintings.text.changeTextOption({
        array: ['READY?', 'READY!'],
        colors: ['rgba(249,205,173)', 'rgba(252,157,154)']
      });
    }, 5000);

    this.init();
  };

  init = () => {
    // const values = Object.values(this.paintings);
    // values.forEach(value => value.freshPointInfo());
    // values.forEach(value => value.draw());

    this.loop = createLoop(() => {
      const values = Object.values(this.paintings);
      values.forEach(value => value.freshPointInfo());
      values.forEach(value => value.draw());
    });

    this.loop.start();
    this.initEvent();
  };

  mouseDown = e => {
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.setMouse({
        x: e.pageX,
        y: e.pageY
      });
      value.setKeys({
        explode: true
      });
    });
  };

  mouseMove = e => {
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.setMouse({
        x: e.pageX,
        y: e.pageY
      });
    });
  };

  mouseUp = () => {
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.resetExplode();
      value.setKeys({
        explode: false
      });
    });
  };

  keyDown = e => {
    let keys = {};
    switch (e.keyCode) {
      case 16:
        keys.rebound = true;
        break;
      case 38:
        keys.bigger = true;
        break;
      case 32:
        keys.shake = true;
        break;
      default:
    }
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.setKeys(keys);
    });
  };

  keyUp = e => {
    let keys = { shift: false };
    switch (e.keyCode) {
      case 16:
        keys.rebound = false;
        break;
      case 38:
        keys.bigger = false;
        break;
      case 32:
        keys.shake = false;
        break;
      default:
    }
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.setKeys(keys);
    });
  };

  windowResize = e => {
    const { width, height } = document.body.getBoundingClientRect();
    this.canvas.current.width = width;
    this.canvas.current.height = height;
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.resetSize({ width, height });
    });
  };

  componentWillUnmount = () => {
    this.loop.stop();
    this.removeEvent();
  };

  initEvent = () => {
    const canvas = this.canvas.current;
    canvas.addEventListener('mousedown', this.mouseDown);
    canvas.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    window.addEventListener('resize', this.windowResize);
  };

  removeEvent = () => {
    const canvas = this.canvas.current;
    canvas.removeEventListener('mousedown', this.mouseDown);
    canvas.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('resize', this.windowResize);
  };

  render = () => {
    return (
      <div className="canvas-wrap">
        <canvas ref={this.canvas} />
      </div>
    );
  };
}

export default Canvas;
