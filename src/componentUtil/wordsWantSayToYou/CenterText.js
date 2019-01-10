import { mergeDeepRight } from 'ramda';
import Base from './PaintingBase';

const mergeOption = mergeDeepRight({
  textSize: 170,
  gutter: 5
});

export default class CenterText extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 4000
    };
    super(option);
    this.textOption = mergeOption(textOption);
  }

  paintingText() {
    const { ctx, width, height } = this.option;
    const { color, textSize, array } = this.textOption;

    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Courier'`;
    array.forEach((str, index) => {
      ctx.fillStyle = color[index % color.length];
      ctx.fillText(
        str,
        (width - ctx.measureText(str).width) / 2,
        height / 2 + (index - (array.length - 1) / 2) * (textSize + 30)
      );
    });
  }

  checkImageData(imgData, index) {
    return imgData.data[index + 3] !== 0
      ? [imgData.data[index], imgData.data[index + 1], imgData.data[index + 2]]
      : null;
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
