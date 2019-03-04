import React, { PureComponent } from 'react';

export default class PhotoShow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      row: new Array(20).fill(0).map((item, index) => index),
      col: new Array(12).fill(0).map((item, index) => index)
    };
    this.timer = null;
  }

  componentDidMount() {}

  render() {
    const { row, col } = this.state;
    return (
      <div className="photo-wrap-all">
        <div className="p-r pwa-stage">
          <div className="p-a pwa-view out-rotate">
            {row.map(rowIndex => (
              <div className="pwa-row">
                {col.map(colIndex => (
                  <div className="pwa-cel">
                    {rowIndex}-{colIndex}
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
