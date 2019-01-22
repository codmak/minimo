import React, { PureComponent } from 'react';

import aVideo from '../assert/media/autumn.mp4';

export default class Vedio extends PureComponent {
  render() {
    return (
      <div className="video-wrap">
        <video controls src={aVideo} />
      </div>
    );
  }
}
