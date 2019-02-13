import React, { PureComponent } from 'react';
import Cake from '../component/Cake';

class Load extends PureComponent {
  render = () => {
    return (
      <div className="loading">
        <div className="canvas-wrap">
          <Cake />
        </div>
      </div>
    );
  };
}

export default Load;
