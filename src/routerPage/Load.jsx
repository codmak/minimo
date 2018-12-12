import React, { Component } from 'react';

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
        <span onClick={this.changCanvasStyle}>ok</span>
      </div>
    );
  }
}

export default Load;
