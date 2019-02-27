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
    // 防止过多的资源消耗
    if (this.beforeText === this.textOption.array) return true;

    const { ctx, width, height } = this.option;
    const { color, textSize, array } = this.textOption;

    this.beforeText = array;

    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Libian SC', 'Microsoft YaHei'`;
    array.forEach((str, index) => {
      ctx.fillStyle = color[index % color.length];
      ctx.fillText(
        str,
        (width - ctx.measureText(str).width) / 2,
        height / 2 + (index - (array.length - 1) / 2) * (textSize + 20)
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
