import Base from './ParticleBase';

export default class CanvasText extends Base {
  draw() {
    const text = 'READY?';
    const textSize = 170;
    return super.draw(
      (ctx, width, height) => {
        ctx.fillStyle = 'rgb(111, 111, 111)';
        ctx.textBaseline = 'middle';
        ctx.font = `${textSize}px 'Arial'`;

        ctx.fillText(
          text,
          (width - ctx.measureText(text).width) / 2,
          height / 2
        );
      },
      (imgData, index) => {
        return imgData.data[index] === 111;
      },
      4
    );
  }
}
