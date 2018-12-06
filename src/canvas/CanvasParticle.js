import Particle from './Particle';

export default class CanvasParticle {
  constructor(option) {
    const { canvas, width, height, num, size } = option;

    option.ctx = canvas.getContext('2d');

    const particles = [];
    for (let i = 0; i < num; i++) {
      particles.push(new Particle(width, height, size));
    }
    option.particles = particles;
    option.canvas.width = width;
    option.canvas.height = height;

    this.option = option;
    this.timer = null;
  }

  drawPoint(point) {
    const { ctx, particleColor } = this.option;
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  particleText(imgData) {
    const { width, height, particles, gutter } = this.option;
    const pxls = [];
    for (let w = width; w > 0; w -= gutter) {
      for (let h = 0; h < height; h += gutter) {
        let index = (w + h * width) * 4;
        if (imgData.data[index] === 111) {
          pxls.push([w, h]);
        }
      }
    }

    let count = pxls.length;
    for (let i = 0; i < pxls.length && i < particles.length; i++) {
      try {
        let point = particles[i],
          X,
          Y;

        X = pxls[count - 1][0] - point.px;
        Y = pxls[count - 1][1] - point.py;

        // 直线距离
        const T = Math.sqrt(X * X + Y * Y);
        // 获取与 x 轴的夹角
        const A = Math.atan2(Y, X);
        // cosine
        const C = Math.cos(A);
        // sine
        const S = Math.sin(A);
        // 设置圆点新值
        point.x = point.px + C * T * point.delta;
        point.y = point.py + S * T * point.delta;
        // 用新值代替起始位置
        point.px = point.x;
        point.py = point.y;
        // 该点是向文字运动的
        point.inText = true;
        // 画出该点
        this.drawPoint(point);
      } catch (e) {
        //console.log(e);
      }
      count--;
    }
  }

  draw() {
    const { ctx, width, height, textSize, getText } = this.option;
    const timeStr = getText();

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgb(111, 111, 111)';
    ctx.textBaseline = 'middle';
    ctx.font = `${textSize}px 'Arial'`;

    ctx.fillText(
      timeStr,
      (width - ctx.measureText(timeStr).width) * 0.5,
      height * 0.5
    );

    const imgData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    this.particleText(imgData);
  }

  loop() {
    this.draw();
    this.timer = requestAnimationFrame(() => this.loop());
  }

  stop() {
    cancelAnimationFrame(this.timer);
  }
}
