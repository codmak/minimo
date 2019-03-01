import React, { PureComponent } from 'react';
import PaintingCake from '../componentUtil/cake/PaintingCake';
import { $on } from '../util';

export default class Cake extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;
    console.log(canvas.getBoundingClientRect());
    debugger;

    const ctx = canvas.getContext('2d');
    this.paintingCake = new PaintingCake({
      ctx,
      width,
      height
    });

    $on('startCake', () => {
      this.paintingCake.start();
    });

    $on('stopCake', () => {
      this.paintingCake.stop();
    });

    $on('moreCake', () => {
      this.paintingCake.more();
    });
  }

  render() {
    return (
      <canvas id="cake-canvas" className="cake-canvas" ref={this.canvasRef} />
    );
  }
}
