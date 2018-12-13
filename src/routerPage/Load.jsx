import React, { Component } from 'react';
import Canvas from '../component/Canvas';

class Load extends Component {
  constructor() {
    super();
  }

  changCanvasStyle = () => {
    const { changCanvasStyle } = this.props;
    console.log(this.props);
    changCanvasStyle({
      width: 300,
      height: 100,
      bottom: 10,
      right: 10
    });
  };

  render() {
    return (
      <div className="load">
        <Canvas />
        <span onClick={this.changCanvasStyle}>ok</span>
      </div>
    );
  }
}

export default Load;
