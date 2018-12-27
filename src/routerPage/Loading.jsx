import React, { Component } from 'react';
import Audio from '../component/Audio';

import springMp3 from '../assert/media/Lucky.mp3';

class Load extends Component {
  // constructor() {
  //   super();
  // }

  render = () => {
    return (
      <div className="load">
        <Audio audio={springMp3} />
      </div>
    );
  };
}

export default Load;
