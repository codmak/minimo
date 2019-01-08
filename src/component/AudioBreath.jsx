import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { $on, $emit, $off } from '../util';
import PaintingBreath from '../componentUtil/audioBreath/PaintingBreath';

import music from '../assert/media/summer.flac';

export default class Audio extends PureComponent {
  constructor() {
    super();
    this.audioRef = React.createRef();
    this.canvasRef = React.createRef();
    // 1: 暂停（还有内容） 2: 正在播放 3: 播放结束
    this.state = {
      palyState: 1
    };
  }

  componentDidMount = () => {
    this.audio = this.audioRef.current;
    this.audio.addEventListener('ended', this.playEnd);
    this.audio.addEventListener('play', this.paintingStart);
    this.audio.addEventListener('pause', this.paintingStop);
    $on('audioPlay', this.audioPlay);
    $on('audioPlayNext', this.audioPlayNext);

    const canvas = this.canvasRef.current;
    const { width, height } = this.canvasRef.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    this.paintingBreath = new PaintingBreath({
      ctx,
      width,
      height,
      circleInfo: {
        number: 30,
        maxSize: 300,
        gutter: 5
      }
    });
  };

  componentWillUnmount = () => {
    this.audio.removeEventListener('ended', this.playEnd);
    this.audio.removeEventListener('play', this.paintingStart);
    this.audio.removeEventListener('pause', this.paintingStop);
    $off('audioPlay', this.audioPlay);
    $off('audioPlayNext', this.audioPlayNext);
  };

  togglePlay = () => {
    const { palyState } = this.state;
    const { id } = this.props;

    switch (palyState) {
      case 3:
      case 1:
        this.audio.play();
        $emit('audioPlay', id);
        this.setState({ palyState: 2 });
        break;
      case 2:
        this.audio.pause();
        this.setState({ palyState: 1 });
        break;
      default:
    }
  };

  playNext = () => {
    const { next } = this.props;
    $emit('audioPlayNext', next);
  };

  getIcon = palyState => {
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
    return (
      <div className="audio-wrap-all p-r">
        <canvas className="awa-canvas p-a" ref={this.canvasRef} />
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
            style={{ x: spring(palyState === 3 ? 50 : 50) }}
          >
            {value => (
              <svg
                className="awa-icon"
                aria-hidden="true"
                style={{ width: value.x, height: value.x }}
                onClick={this.playNext}
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

  playEnd = () => {
    this.setState({ palyState: 3 });
  };

  paintingStart = () => {
    this.paintingBreath.start();
  };

  paintingStop = () => {
    this.paintingBreath.stop();
  };

  audioPlay = playId => {
    const { id } = this.props;
    if (playId !== id) {
      this.audio.pause();
      this.setState({ palyState: 1 });
    }
  };

  audioPlayNext = nextId => {
    const { id } = this.props;
    if (nextId !== id) {
      this.audio.pause();
      this.setState({ palyState: 1 });
    } else {
      this.audio.play();
      this.setState({ palyState: 2 });
    }
  };
}
