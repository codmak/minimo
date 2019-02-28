import React, { PureComponent } from 'react';
import AudioBreath from './AudioBreath';
import MusicBar from '../componentUtil/music/MusicBar';
import { rainbow } from '../componentUtil/music/data/color';

export default class Music extends PureComponent {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.click = false;
  }

  audioInit = () => {
    // 需要确保之前的页面有点击事件，并且只调用一次
    if (this.click) return;
    this.click = true;
    let audioCtx = new AudioContext();
    let analyser = audioCtx.createAnalyser();
    let source = null;
    analyser.fftSize = 2048;

    const canvas = this.canvasRef.current;
    const { width, height } = this.canvasRef.current.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    this.musicBar = new MusicBar({
      ctx: ctx,
      width,
      height,
      barInfo: {
        width: 4,
        gutter: 0
      },
      color: rainbow,
      analyser
    });

    let audios = [...document.getElementsByClassName('play-audio')];
    audios.forEach(element => {
      element.addEventListener('play', e => {
        analyser.connect(audioCtx.destination);
        try {
          source = audioCtx.createMediaElementSource(e.target);
        } catch (e) {}
        source.connect(analyser);
        this.musicBar.start();
      });
      element.addEventListener('pause', e => {
        this.musicBar.stop();
      });
    });
  };

  render = () => {
    return (
      <div className="music-wrap-all p-r" onClick={this.audioInit}>
        <canvas className="mwa-canvas p-a" ref={this.canvasRef} />
        <div className="mwa-box">
          <AudioBreath />
        </div>
      </div>
    );
  };
}
