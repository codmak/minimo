import Base from './PaintingBase';
import { mergeDeepRight } from 'ramda';
import { getTimeStr } from '../../util';

const mergeOption = mergeDeepRight({
  color: 'rgb(0, 0, 0)',
  textSize: 170,
  center: true
});

export default class Time extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 1000
    };
    super(option);
    this.textOption = mergeOption(textOption || {});
  }

  paintingText() {
    const { ctx, width, height } = this.option;
    const { color, textSize, center } = this.textOption;
    if (!color) return;
    const text = getTimeStr();

    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Helvetica'`;

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
