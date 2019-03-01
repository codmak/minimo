import hexRgb from 'hex-rgb';
import Bar from './Bar';
import { createLoop } from '../../util';

export default class MusicBar {
  constructor(option) {
    const { width, barInfo, color } = option;
    barInfo.number = Math.floor(width / (barInfo.width + barInfo.gutter));
    this.bar = [];

    for (var i = 0; i < barInfo.number; i++) {
      this.bar.push(
        new Bar(
          i * (barInfo.width + barInfo.gutter),
          barInfo.width,
          color[i % color.length]
        )
      );
    }

    this.analyserGutter = Math.round(1024 / barInfo.number);
    this.arrayGutter = this.option = option;
  }

  drawRect(bar) {
    const { height, ctx } = this.option;
    let color = hexRgb(bar.color);
    ctx.fillStyle = `rgba(${color.red},${color.green},${color.blue},.5)`;
    ctx.fillRect(bar.x, (height - bar.height) / 2, bar.width, bar.height);
  }

  getAudioDataArray(analyser) {
    var bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  draw() {
    const { analyser, ctx, width, height } = this.option;

    ctx.clearRect(0, 0, width, height);
    var array = this.getAudioDataArray(analyser);
    this.bar.forEach((bar, index) => {
      bar.height = (array[index * this.analyserGutter] / 256) * height;
    });

    this.bar.forEach(bar => this.drawRect(bar));
  }

  start() {
    if (!this.loop) {
      this.loop = createLoop(() => this.draw());
    }
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
