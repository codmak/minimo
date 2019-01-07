import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';

import music from '../assert/media/summer.flac';

export default class Audio extends PureComponent {
  constructor() {
    super();
    this.audioRef = React.createRef();
    // 1: 暂停（还有内容） 2: 正在播放 3: 播放结束
    this.state = {
      palyState: 1
    };
  }

  playEnd = () => {
    this.setState({ palyState: 3 });
  };

  componentDidMount() {
    this.audio = this.audioRef.current;
    this.audio.addEventListener('ended', this.playEnd);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.playEnd);
  }

  componentDidUpdate() {
    const { play } = this.props;
    if (play) {
      this.setState({ palyState: 2 });
      this.audio.play();
    } else {
      this.setState({ palyState: 1 });
      this.audio.pause();
    }
  }

  togglePlay = () => {
    const { palyState } = this.state;
    const { id, setSetp, play } = this.props;

    if (!play) {
      this.audio.play();
      setSetp(id);
      this.setState({ palyState: 2 });
    } else {
      switch (palyState) {
        case 3:
        case 1:
          this.audio.play();
          setSetp(id);
          this.setState({ palyState: 2 });
          break;
        case 2:
          this.audio.pause();
          this.setState({ palyState: 1 });
          break;
        default:
      }
    }
  };

  getIcon = palyState => {
    const { play } = this.props;
    if (!play) return '#icon-bofang';
    switch (palyState) {
      case 1:
      case 3:
        return '#icon-bofang';
      case 2:
        return '#icon-zanting';
      default:
    }
  };

  render = () => {
    const { play, audio, playNext } = this.props;
    const { palyState } = this.state;
    return (
      <div className="audio-wrap-all p-r">
        <canvas className="awa-canvas p-a" />
        <div className="awa-wrap x-row">
          <svg
            className="awa-icon"
            aria-hidden="true"
            onClick={this.togglePlay}
          >
            <use xlinkHref={this.getIcon(palyState)} />
          </svg>
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(palyState === 3 && play ? 50 : 0) }}
          >
            {value => (
              <svg
                className="awa-icon"
                aria-hidden="true"
                style={{ width: value.x, height: value.x }}
                onClick={playNext}
              >
                <use xlinkHref="#icon-xiayishou" />
              </svg>
            )}
          </Motion>
          <audio
            className="play-audio"
            controls
            src={music} //audio
            crossOrigin="anonymous"
            ref={this.audioRef}
          />
        </div>
      </div>
    );
  };
}
