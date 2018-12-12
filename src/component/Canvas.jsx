import React, { Component } from 'react';
import CanvasTime from '../canvas/Time';
import CanvasText from '../canvas/Text';
import { createLoop } from '../util';

class Canvas extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.paintings = {};
    this.loops = {};
  }

  componentDidMount = () => {
    const canvas = this.canvas.current;
    const { width, height } = this.canvas.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    this.paintings.time = new CanvasTime({
      width,
      height,
      particleInfo: {
        size: 4
      }
    });

    this.paintings.text = new CanvasText({
      width,
      height,
      particleInfo: {
        size: 6,
        number: 1800
      }
    });

    this.paintings.time.draw();
    this.paintings.text.draw();
    this.paintings.time.paint();
    this.paintings.text.paint();

    // this.loops.time = createLoop(() => {
    //   this.paintings.time.draw();
    //   this.paintings.text.draw();
    //   this.paintings.time.paint();
    //   this.paintings.text.paint();
    // });
    // this.loops.text = createLoop(() => this.paintings.text.draw());

    this.initPaintings();
    window.ctx = canvas.getContext('2d');
  };

  initPaintings = () => {
    Object.entries(this.loops).forEach(([key, value]) => {
      value.start();
    });

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
    Object.entries(this.loops).forEach(([key, value]) => {
      value.stop();
    });
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
