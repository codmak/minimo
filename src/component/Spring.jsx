import React, { PureComponent } from 'react';
import Audio from './Audio';
import MusicBar from '../pageUtil/music/MusicBar';

import springMp3 from '../assert/media/spring.mp3';

export default class Spring extends PureComponent {
  constructor() {
    super();
    this.audioRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.audio = this.audioRef.current.audio;
    this.canvas = this.canvasRef.current;
    this.init();

    this.audio.addEventListener('play', () => {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
        this.analyser = this.audioCtx.createAnalyser();
        this.source = this.audioCtx.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
      }
      this.stopVisible = this.musicBar.audioVisible(this.analyser);
    });

    this.audio.addEventListener('pause', () => {
      this.stopVisible();
    });
  }

  init() {
    this.musicBar = new MusicBar({
      canvas: this.canvas,
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight,
      barInfo: {
        width: 4,
        gutter: 1
      },
      color: [
        '#aeecf8',
        '#dca3c9',
        '#dc6a77',
        '#f1a0bb',
        '#f5b8cf',
        '#e3e9d8',
        '#c5d6c5'
      ]
    });
  }

  render() {
    const { step, setSetp } = this.props;
    return (
      <div className="season-box spring p-r">
        <Audio
          audio={springMp3}
          id="spring"
          play={step === 'spring'}
          setSetp={setSetp}
          ref={this.audioRef}
        />
        <canvas ref={this.canvasRef} />
      </div>
    );
  }
}
