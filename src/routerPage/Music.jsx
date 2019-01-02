import React, { PureComponent } from 'react';
import Audio from '../component/Audio';
import Spring from '../component/Spring';

import summerMp3 from '../assert/media/summer.flac';
import autumnMp3 from '../assert/media/autumn.mp3';
import winterMp3 from '../assert/media/winter.mp3';

export default class Music extends PureComponent {
  constructor() {
    super();
    this.state = {
      step: ''
    };
  }

  playCallback = step => {
    this.setState({
      step
    });
  };

  setSetp = step => {
    this.setState({
      step
    });
  };

  render = () => {
    const { step } = this.state;
    return (
      <div className="music-wrap-all">
        <div className="x-row season-row">
          <Spring step={step} setSetp={this.setSetp} />
          <div className="season-box summer p-r">
            <Audio
              audio={summerMp3}
              id="summer"
              play={step === 'summer'}
              setSetp={this.playCallback}
            />
          </div>
        </div>
        <div className="x-row season-row">
          <div className="season-box autumn p-r">
            <Audio
              audio={autumnMp3}
              id="autumn"
              play={step === 'autumn'}
              setSetp={this.playCallback}
            />
          </div>
          <div className="season-box winter p-r">
            <Audio
              audio={winterMp3}
              id="winter"
              play={step === 'winter'}
              setSetp={this.playCallback}
            />
          </div>
        </div>
      </div>
    );
  };
}
