import Base from './ParticleBase';
import { getTimeStr } from '../util';

export default class CanvasTime extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 0,
      number: 800
    };
    super(option);
    this.textOption = textOption || {};
  }

  freshPointInfo() {
    const { color, textSize, center } = this.textOption;
    if (!color) return;
    const text = getTimeStr();
    super.freshPointInfo(
      (ctx, width, height) => {
        ctx.fillStyle = color;
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Arial'`;

        if (center) {
          ctx.fillText(
            text,
            (width - ctx.measureText(text).width) / 2,
            height / 2
          );
        } else {
          ctx.fillText(
            text,
            width - ctx.measureText(text).width - 10,
            height - textSize / 2
          );
        }
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
      center ? 6 : 4
    );
  }

  changeTextOption(textOption) {
    this.textOption = {
      ...this.textOption,
      ...textOption
    };
  }
}
