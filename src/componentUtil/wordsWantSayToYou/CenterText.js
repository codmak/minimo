import { mergeDeepRight } from 'ramda';
import Base from './PaintingBase';

const mergeOption = mergeDeepRight({
  array: [],
  textSize: 140,
  gutter: 4
});

export default class CenterText extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 4000
    };
    super(option);
    this.textOption = mergeOption(textOption || {});
  }

  paintingText() {
    const { ctx, width, height } = this.option;
    const { color, textSize, array } = this.textOption;

    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Libian SC'`;
    array.forEach((str, index) => {
      ctx.fillStyle = color[index % color.length];
      ctx.fillText(
        str,
        (width - ctx.measureText(str).width) / 2,
        height / 2 + (index - (array.length - 1) / 2) * (textSize + 30)
      );
    });
  }

  painting() {
    const { gutter } = this.textOption;
    super.painting(gutter);
  }

  changeTextOption(textOption) {
    this.textOption = {
      ...this.textOption,
      ...textOption
    };
  }
}
