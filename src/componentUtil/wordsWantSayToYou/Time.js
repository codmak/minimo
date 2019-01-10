import Base from './PaintingBase';
import { getTimeStr } from '../../util';

export default class Time extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 800
    };
    super(option);
    this.textOption = textOption || {};
  }

  paintingText() {
    const { ctx, width, height } = this.option;
    const { color, textSize, center } = this.textOption;
    if (!color) return;
    const text = getTimeStr();

    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Arial'`;

    if (center) {
      ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
    } else {
      ctx.fillText(
        text,
        width - ctx.measureText(text).width - 10,
        height - textSize / 2 - 70
      );
    }
  }

  checkImageData(imgData, index) {
    return imgData.data[index + 3] !== 0
      ? [imgData.data[index], imgData.data[index + 1], imgData.data[index + 2]]
      : null;
  }

  painting() {
    const { center } = this.textOption;
    super.painting(center ? 6 : 4);
  }

  changeTextOption(textOption) {
    this.textOption = {
      ...this.textOption,
      ...textOption
    };
  }
}
