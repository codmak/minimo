import React, { PureComponent } from 'react';
import PaintingBreath from '../componentUtil/audioBreath/PaintingBreath';
import { getMusic } from '../componentUtil/audioBreath/data/music';

let music = getMusic();

export default class AudioBreath extends PureComponent {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.canvasRef = React.createRef();
    // 1: 暂停（还有内容） 2: 正在播放 3: 播放结束
    this.state = {
      playState: 1
    };
  }

  componentDidMount() {
    this.audio = this.audioRef.current;
    this.audio.addEventListener('ended', this.playEnd);
    this.audio.addEventListener('play', this.paintingStart);
    this.audio.addEventListener('pause', this.paintingStop);

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
        maxSize: 100,
        gutter: 5
      }
    });
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', this.playEnd);
    this.audio.removeEventListener('play', this.paintingStart);
    this.audio.removeEventListener('pause', this.paintingStop);
  }

  togglePlay = () => {
    const { playState } = this.state;

    switch (playState) {
      case 3:
      case 1:
        this.audio.play();
        this.setState({ playState: 2 });
        break;
      case 2:
        this.audio.pause();
        this.setState({ playState: 1 });
        break;
      default:
    }
  };

  playNext = () => {
    this.audio.src = getMusic();
    this.audio.play();
  };

  getIcon = playState => {
    switch (playState) {
      case 1:
      case 3:
        return '#icon-bofang';
      case 2:
        return '#icon-zanting';
      default:
    }
  };

  getStateClass = playState => {
    switch (playState) {
      case 1:
      case 3:
        return 'pause';
      case 2:
        return 'play';
      default:
    }
  };

  render = () => {
    const { playState } = this.state;
    return (
      <div className="audio-wrap-all p-r">
        <canvas className="awa-canvas p-a" ref={this.canvasRef} />
        <div className={`awa-wrap ${this.getStateClass(playState)}`}>
          <svg
            className="awa-icon"
            aria-hidden="true"
            onClick={this.togglePlay}
          >
            <use xlinkHref={this.getIcon(playState)} />
          </svg>
          <svg className="awa-icon" aria-hidden="true" onClick={this.playNext}>
            <use xlinkHref="#icon-xiayishou" />
          </svg>
          <audio
            className="play-audio"
            controls
            src={music}
            crossOrigin="anonymous"
            ref={this.audioRef}
          />
        </div>
      </div>
    );
  };

  playEnd = () => {
    this.setState({ playState: 3 });
  };

  paintingStart = () => {
    this.paintingBreath.start();
  };

  paintingStop = () => {
    this.paintingBreath.stop();
  };
}
