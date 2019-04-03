import React, { PureComponent } from 'react';
import Music from '../component/Music';
import { SeasonRoute } from '../router';

class Season extends PureComponent {
  render = () => {
    const { location } = this.props;
    return (
      <div className="season-all">
        <div className="sa-top">
          <SeasonRoute location={location} />
        </div>
        <div className="sa-music-wrap">
          <Music />
        </div>
      </div>
    );
  };
}

export default Season;
