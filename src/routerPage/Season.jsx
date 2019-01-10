import React, { PureComponent } from 'react';
import Music from '../component/Music';

import { SeasonRoute } from '../router';

class Season extends PureComponent {
  render = () => {
    return (
      <div className="all-about-you">
        <div className="aay-top">
          <SeasonRoute />
        </div>
        <div className="aay-music-wrap">
          {/* <Music /> */}
        </div>
      </div>
    );
  };
}

export default Season;
