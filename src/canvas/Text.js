import Base from './ParticleBase';

export class CanvasCenterText extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 13000
    };
    super(option);
    this.textOption = textOption || {
      textSize: 170,
      gutter: 4
    };
  }

  freshPointInfo() {
    const { array, color, textSize, gutter } = this.textOption;
    if (!array) return;
    return super.freshPointInfo(
      (ctx, width, height) => {
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Courier'`;
        array.forEach((str, index) => {
          ctx.fillStyle = color[index % color.length];
          ctx.fillText(
            str,
            (width - ctx.measureText(str).width) / 2,
            height / 2 + (index - (array.length - 1) / 2) * (textSize + 10)
          );
        });
      },
      (imgData, index) => {
        return imgData.data[index] !== 0
          ? [
              imgData.data[index],
              imgData.data[index + 1],
              imgData.data[index + 2]
            ]
          : null;
      },
      gutter
    );
  }

  changeTextOption(textOption) {
    this.textOption = {
      ...this.textOption,
      ...textOption
    };
  }
}
