import React, { PureComponent } from 'react';
import Time from '../componentUtil/wordsWantSayToYou/Time';
import CenterText from '../componentUtil/wordsWantSayToYou/CenterText';
import steps from '../componentUtil/wordsWantSayToYou/steps';
import { createLoop } from '../util';

export default class WordsWantSayToYou extends PureComponent {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    // 绘画对象存储
    this.paintings = {};
    // 定时器存储
    this.loop = null;
    // 是否按下
    this.press = false;
    this.steps = steps;
    this.state = {
      stepIndex: 0
    };
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const { width, height } = this.canvasRef.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    this.paintings.time = new Time({
      ctx,
      width,
      height
    });

    this.paintings.text = new CenterText({
      ctx,
      width,
      height
    });

    this.init();
  }

  componentWillUnmount() {
    this.loop.stop();
    this.removeEvent();
  }

  render() {
    const { stepIndex } = this.state;
    return (
      <div className="wwsty-all">
        <canvas ref={this.canvasRef} />
        <div
          className={`prev btn${stepIndex === 0 ? ' disabled' : ''}`}
          onClick={this.prev}
        />
        <div
          className={`next btn${
            stepIndex === this.steps.length - 1 ? ' disabled' : ''
          }`}
          onClick={this.next}
        />
      </div>
    );
  }

  init = () => {
    const { steps } = this;
    this.loop = createLoop(() => {
      this.paintings.time.painting();
      this.paintings.text.painting();
      this.paintings.time.draw();
      this.paintings.text.draw();
    });

    this.loop.start();
    this.initEvent();

    steps[0](this.paintings);
  };

  next = () => {
    const { stepIndex } = this.state;
    if (stepIndex === this.paintings.length - 1) return;
    this.setState({
      stepIndex: stepIndex + 1
    });
    this.steps[stepIndex + 1](this.paintings);
  };

  prev = () => {
    const { stepIndex } = this.state;
    if (stepIndex === 0) return;
    this.setState({
      stepIndex: stepIndex - 1
    });
    this.steps[stepIndex - 1](this.paintings);
  };

  mouseDown = e => {
    this.press = true;
    Object.values(this.paintings).forEach(value => {
      value.initExplode();
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
    if (!this.press) return;
    Object.values(this.paintings).forEach(value => {
      value.setMouse({
        x: e.pageX,
        y: e.pageY
      });
    });
  };

  mouseUp = () => {
    Object.values(this.paintings).forEach(value => {
      value.resetExplode();
      value.setKeys({
        explode: false
      });
    });
  };

  keyDown = e => {
    let keys = {};
    switch (e.keyCode) {
      case 32:
        keys.rebound = true;
        break;
      case 38:
        keys.bigger = true;
        break;
      case 16:
        keys.shake = true;
        break;
      case 37:
        this.prev();
        break;
      case 39:
        this.next();
        break;
      default:
    }
    Object.values(this.paintings).forEach(value => {
      value.setKeys(keys);
    });
  };

  keyUp = e => {
    let keys = { shift: false };
    switch (e.keyCode) {
      case 32:
        keys.rebound = false;
        break;
      case 38:
        keys.bigger = false;
        break;
      case 16:
        keys.shake = false;
        break;
      default:
    }
    Object.values(this.paintings).forEach(value => {
      value.setKeys(keys);
    });
  };

  windowResize = () => {
    const { width, height } = this.canvasRef.current.getBoundingClientRect();
    this.canvasRef.current.width = width;
    this.canvasRef.current.height = height;
    Object.values(this.paintings).forEach(value => {
      value.resetSize({ width, height });
    });
  };

  initEvent = () => {
    const canvas = this.canvasRef.current;
    canvas.addEventListener('mousedown', this.mouseDown);
    canvas.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
    window.addEventListener('resize', this.windowResize);
  };

  removeEvent = () => {
    const canvas = this.canvasRef.current;
    canvas.removeEventListener('mousedown', this.mouseDown);
    canvas.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('keyup', this.keyUp);
    window.removeEventListener('resize', this.windowResize);
  };
}
