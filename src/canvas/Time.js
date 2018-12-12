import Base from './ParticleBase';
import { getTimeStr } from '../util';

export default class CanvasTime extends Base {
  draw() {
    const text = getTimeStr();
    const textSize = 70;
    return super.draw(
      (ctx, width, height) => {
        ctx.fillStyle = 'rgb(111, 111, 111)';
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Arial'`;

        ctx.fillText(
          text,
          width - ctx.measureText(text).width - 10,
          height - textSize / 2
        );
      },
      (imgData, index) => {
        return imgData.data[index] === 111;
      },
      4
    );
  }
}
