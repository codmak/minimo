import Base from './ParticleBase';
import { getTimeStr } from '../util';

export default class CanvasTime extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 4,
      number: 400
    };
    super(option);
    this.textOption = textOption;
  }

  freshPointInfo() {
    const { color } = this.textOption;
    const text = getTimeStr();
    const textSize = 70;
    return super.freshPointInfo(
      (ctx, width, height) => {
        ctx.fillStyle = color;
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Arial'`;

        ctx.fillText(
          text,
          width - ctx.measureText(text).width - 10,
          height - textSize / 2
        );
      },
      (imgData, index) => {
        return imgData.data[index + 3] !== 0
          ? [
              imgData.data[index],
              imgData.data[index + 1],
              imgData.data[index + 2]
            ]
          : null;
      },
      4
    );
  }

  changeTextOption(textOption) {
    this.textOption = textOption;
  }
}
