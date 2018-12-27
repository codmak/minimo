import React, { Component } from 'react';

export default class Audio extends Component {
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
    const audio = this.audioRef.current;
    audio.addEventListener('ended', this.playEnd);
  }

  componentWillUnmount() {
    const audio = this.audioRef.current;
    audio.removeEventListener('ended', this.playEnd);
  }

  togglePlay = () => {
    const { palyState } = this.state;
    const audio = this.audioRef.current;
    switch (palyState) {
      case 3:
      case 1:
        audio.play();
        this.setState({ palyState: 2 });
        break;
      case 2:
        audio.pause();
        this.setState({ palyState: 1 });
        break;
      default:
    }
  };

  getIcon = palyState => {
    switch (palyState) {
      case 1:
        return '#icon-bofang';
      case 2:
        return '#icon-zanting';
      case 3:
        return '#icon-xiayishou';
      default:
    }
  };

  render = () => {
    const { audio } = this.props;
    const { palyState } = this.state;
    return (
      <div className="audio-wrap x-row" onClick={this.togglePlay}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={this.getIcon(palyState)} />
        </svg>
        <audio controls src={audio} ref={this.audioRef} />
      </div>
    );
  };
}
