import React, { PureComponent } from 'react';
import PaintingCake from '../componentUtil/cake/PaintingCake';

export default class Cake extends PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const { width, height } = this.canvasRef.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    this.paintingCake = new PaintingCake({
      ctx,
      width,
      height
    });

    this.paintingCake.start();
  }

  render() {
    return (
      <canvas id="cake-canvas" className="cake-canvas" ref={this.canvasRef} />
    );
  }
}
