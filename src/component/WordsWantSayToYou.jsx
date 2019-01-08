import React, { PureComponent } from 'react';
import { Button } from 'antd';

import Time from '../componentUtil/wordsWantSayToYou/Time';
import CenterText from '../componentUtil/wordsWantSayToYou/CenterText';
import steps from '../componentUtil/wordsWantSayToYou/steps';
import { getTimeColor } from '../componentUtil/wordsWantSayToYou/data/color';
import { createLoop } from '../util';

export default class WordsWantSayToYou extends PureComponent {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.paintings = {};
    this.loop = null;
    this.steps = steps;
    this.state = {
      stepIndex: 0
    };
  }

  componentDidMount = () => {
    const canvas = this.canvasRef.current;
    const { width, height } = this.canvasRef.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    this.paintings.time = new Time(
      {
        ctx,
        width,
        height
      },
      {
        color: getTimeColor()
      }
    );

    this.paintings.text = new CenterText({
      ctx,
      width,
      height
    });

    this.init();
  };

  render = () => {
    const { stepIndex } = this.state;
    return (
      <div className="wwsty-all">
        <canvas ref={this.canvasRef} />
        <Button
          className="prev"
          type="primary"
          shape="circle"
          icon="left"
          disabled={stepIndex === 0}
          onClick={this.prev}
        />
        <Button
          className="next"
          type="primary"
          shape="circle"
          icon="right"
          disabled={stepIndex === this.steps.length - 1}
          onClick={this.next}
        />
      </div>
    );
  };

  next = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1
    });
    this.steps[stepIndex + 1](this.paintings);
  };

  prev = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex - 1
    });
    this.steps[stepIndex - 1](this.paintings);
  };

  init = () => {
    const { steps } = this;
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

    setInterval(() => {
      this.paintings.time.changeTextOption({
        color: getTimeColor()
      });
    }, 3000);

    steps[0](this.paintings);
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
    this.canvasRef.current.width = width;
    this.canvasRef.current.height = height;
    Object.entries(this.paintings).forEach(([key, value]) => {
      value.resetSize({ width, height });
    });
  };

  componentWillUnmount = () => {
    this.loop.stop();
    this.removeEvent();
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
