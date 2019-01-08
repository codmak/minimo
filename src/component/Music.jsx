import React, { PureComponent } from 'react';
import AudioBreath from './AudioBreath';
import MusicBar from '../componentUtil/music/MusicBar';

const seasons = ['spring', 'summer', 'autumn', 'winter'];

export default class Music extends PureComponent {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.state = {
      step: ''
    };
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.init();
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

  initAudio = () => {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 4096;
      this.analyser.connect(this.audioCtx.destination);
      let audios = [...document.getElementsByClassName('play-audio')];
      audios.forEach(element => {
        element.addEventListener('play', e => {
          console.log('play');
          try {
            this.source = this.audioCtx.createMediaElementSource(e.target);
          } catch (e) {
            console.log(e);
          }
          this.source.connect(this.analyser);
          this.stopVisible = this.musicBar.audioVisible(this.analyser);
        });
        element.addEventListener('pause', e => {
          this.stopVisible();
        });
      });
    }
  };

  render = () => {
    return (
      <div className="music-wrap-all x-row p-r" onClick={this.initAudio}>
        <canvas className="mwa-canvas p-a" ref={this.canvasRef} />
        <div className="mwa-box">
          <AudioBreath
            audio="http://cdn.acohome.cn/spring.mp3"
            id="spring"
            next="summer"
          />
        </div>
        <div className="mwa-box">
          <AudioBreath
            audio="http://cdn.acohome.cn/summer.flac"
            id="summer"
            next="autumn"
          />
        </div>
        <div className="mwa-box">
          <AudioBreath
            audio="http://cdn.acohome.cn/autumn.mp3"
            id="autumn"
            next="winter"
          />
        </div>
        <div className="mwa-box">
          <AudioBreath
            audio="http://cdn.acohome.cn/winter.mp3"
            id="winter"
            next="spring"
          />
        </div>
      </div>
    );
  };
}
