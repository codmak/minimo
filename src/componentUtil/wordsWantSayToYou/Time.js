import Base from './PaintingBase';
import { mergeDeepRight } from 'ramda';
import { getTimeLong } from '../../util';
import { getTimeColor } from './data/color';

const mergeOption = mergeDeepRight({
  textSize: 150,
  center: true
});

export default class Time extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 1600,
      deltaC: 0.01
    };
    super(option);
    this.textOption = mergeOption(textOption || {});
    this.beforeText = null;
    this.beforePosi = null;
    this.beforeColor = null;
    this.colorNum = 0;
  }

  paintingText() {
    const { ctx, width, height } = this.option;
    const { textSize, center } = this.textOption;
    const time = getTimeLong();
    const text = `${time[0]}-${time[1]}-${time[2]} ${time[3]}:${time[4]}:${
      time[5]
    }`;
    let color = this.beforeColor || getTimeColor();

    // 防止过多的资源消耗
    if (this.beforeText === text && this.beforePosi === center) return true;
    this.beforeText = text;
    this.beforePosi = center;

    this.colorNum++;
    if (this.colorNum > 5) {
      this.colorNum %= 5;
      color = getTimeColor();
    }
    this.beforeColor = color;

    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Helvetica'`;

    if (center) {
      ctx.fillText(text, (width - ctx.measureText(text).width) / 2, height / 2);
    } else {
      ctx.fillText(
        text,
        width - ctx.measureText(text).width - 10,
        height - textSize / 2 - 10
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
