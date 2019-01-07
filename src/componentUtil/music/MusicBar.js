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

    this.canvasCtx = option.canvas.getContext('2d');
    option.canvas.width = option.width;
    option.canvas.height = option.height;
    this.option = option;
  }

  getAudioDataArray(analyser) {
    var bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength);

    analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  drawRect(bar) {
    const { height } = this.option;
    this.canvasCtx.fillStyle = bar.color;
    this.canvasCtx.fillRect(
      bar.x,
      (height - bar.height) / 2,
      bar.width,
      bar.height
    );
  }

  audioVisible(analyser) {
    const {
      width,
      height,
      barInfo: { number }
    } = this.option;
    var gutter = Math.round(1024 / number);

    const draw = () => {
      this.canvasCtx.clearRect(0, 0, width, height);
      var array = this.getAudioDataArray(analyser);
      this.bar.forEach((bar, index) => {
        bar.height = (array[index * gutter] * height) / 256;
      });
      this.bar.forEach(bar => this.drawRect(bar));
    };

    const loop = createLoop(draw);
    loop.start();

    return loop.stop;
  }
}
