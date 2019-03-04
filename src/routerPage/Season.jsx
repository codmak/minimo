import React, { PureComponent } from 'react';
import Music from '../component/Music';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { SeasonRoute } from '../router';

class Season extends PureComponent {
  render = () => {
    const { location } = this.props;
    return (
      <div className="season-all">
        <div className="sa-top">
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="rotate"
              timeout={800}
            >
              <SeasonRoute location={location} />
            </CSSTransition>
          </TransitionGroup>
        </div>
        {/* <div className="sa-music-wrap">
          <Music />
        </div> */}
      </div>
    );
  };
}

export default Season;
