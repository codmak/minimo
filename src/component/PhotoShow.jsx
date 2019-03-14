import React, { PureComponent } from 'react';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ballState: 0,
      grid: [
        new Array(12).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(17).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(21).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(24).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(27).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(29).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(30).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(29).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(27).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(24).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(21).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(17).fill(0).map((_, index) => ({ name: index, state: 0 })),
        new Array(12).fill(0).map((_, index) => ({ name: index, state: 0 }))
      ]
    };
    this.timer = null;

    let grid = this.state.grid;
    let col = grid.length - 1;
    let row = grid[col].length - 1;

    let timer = setInterval(() => {
      grid[col][row].state = 1;
      this.setState({
        grid: [...grid]
      });
      row--;
      if (row === -1) {
        col--;
        if (col === -1) {
          clearInterval(timer);
          this.setState({
            ballState: 1
          });
          return;
        }
        row = grid[col].length - 1;
      }
    }, 200);
  }

  getCardStateClass = cardState => {
    switch (cardState) {
      case 0:
        return 'flat';
      case 1:
        return 'circle';
      default:
        return '';
    }
  };

  getBallStateClass = ballState => {
    switch (ballState) {
      case 0:
        return '';
      case 1:
        return 'out-rotate';
      default:
        return '';
    }
  };

  render() {
    const { grid, ballState } = this.state;
    return (
      <div className="photo-wrap-all">
        <div className="p-r pwa-stage">
          <div className={`p-a pwa-view ${this.getBallStateClass(ballState)}`}>
            {grid.map((col, colIndex) => (
              <div className="pwa-col" key={colIndex}>
                {col.map((item, rowIndex) => (
                  <div
                    className={`pwa-cel ${this.getCardStateClass(item.state)}`}
                    key={rowIndex}
                  >
                    {colIndex}-{rowIndex}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
