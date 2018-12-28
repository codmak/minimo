import React, { Component } from 'react';
import Audio from '../component/Audio';

import springMp3 from '../assert/media/spring.mp3';
import summerMp3 from '../assert/media/summer.flac';
import autumnMp3 from '../assert/media/autumn.mp3';
import winterMp3 from '../assert/media/winter.mp3';

export default class Music extends Component {
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

  render = () => {
    const { step } = this.state;
    return (
      <div className="music-wrap-all">
        <div className="x-row season-row">
          <div className="season-box x-center spring">
            <Audio
              audio={springMp3}
              id="spring"
              play={step === 'spring'}
              playCallback={this.playCallback}
            />
          </div>
          <div className="season-box x-center summer">
            <Audio
              audio={summerMp3}
              id="summer"
              play={step === 'summer'}
              playCallback={this.playCallback}
            />
          </div>
        </div>
        <div className="x-row season-row">
          <div className="season-box x-center autumn">
            <Audio
              audio={autumnMp3}
              id="autumn"
              play={step === 'autumn'}
              playCallback={this.playCallback}
            />
          </div>
          <div className="season-box x-center winter">
            <Audio
              audio={winterMp3}
              id="winter"
              play={step === 'winter'}
              playCallback={this.playCallback}
            />
          </div>
        </div>
      </div>
    );
  };
}
