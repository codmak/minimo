import React, { PureComponent } from 'react';
import { Motion, spring, presets } from 'react-motion';

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
    if (!play) {
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
    const { audio } = this.props;
    const { palyState } = this.state;
    const { play } = this.props;
    return (
      <div className="audio-wrap x-row p-a">
        <svg className="icon" aria-hidden="true" onClick={this.togglePlay}>
          <use xlinkHref={this.getIcon(palyState)} />
        </svg>
        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(palyState === 3 && play ? 50 : 0) }}
        >
          {value => (
            <svg
              className="icon"
              aria-hidden="true"
              style={{ width: value.x, height: value.x }}
            >
              <use xlinkHref="#icon-xiayishou" />
            </svg>
          )}
        </Motion>
        <audio controls src={audio} ref={this.audioRef} />
      </div>
    );
  };
}
