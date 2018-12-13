import Base from './ParticleBase';

export class CanvasCenterText extends Base {
  constructor(option, textOption) {
    option.particleInfo = {
      size: 6,
      number: 8000
    };
    super(option);
    this.textOption = textOption;
  }

  freshPointInfo() {
    const { array, colors } = this.textOption;
    const textSize = 170;
    return super.freshPointInfo(
      (ctx, width, height) => {
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Courier'`;
        array.forEach((str, index) => {
          ctx.fillStyle = colors[index];
          ctx.fillText(
            str,
            (width - ctx.measureText(str).width) / 2,
            height / 2 + (index - (array.length - 1) / 2) * textSize
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
      4
    );
  }

  changeTextOption(textOption) {
    this.textOption = textOption;
  }
}
