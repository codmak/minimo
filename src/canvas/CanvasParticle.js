import Particle from './Particle';

function applyConsume(speed, consume) {
  if (speed > 1) {
    return speed * consume;
  }
  return speed;
}

export default class CanvasParticle {
  constructor(option) {
    const { canvas, width, height, num, size } = option;
    option.canvas.width = width;
    option.canvas.height = height;

    option.ctx = canvas.getContext('2d');

    const particles = [];
    for (let i = 0; i < num; i++) {
      particles.push(new Particle(width, height, size));
    }
    option.particles = particles;

    option.press = false;
    option.key = {
      shift: false,
      up: false,
      space: false
    };
    option.mouse = {
      x: 0,
      y: 0
    };

    this.option = option;
    this.timer = null;
  }

  drawPoint(point) {
    const {
      gutter,
      key: { up, space }
    } = this.option;
    const { ctx, particleColor } = this.option;

    if (up) {
      point.size = point.size + 0.03;
    } else {
      var newSize = point.size - 0.06;
      if (newSize > point.origSize && newSize > 0) {
        point.size = newSize;
      } else {
        point.size = point.origSize;
      }
    }

    ctx.fillStyle = particleColor;
    ctx.beginPath();
    if (space) {
      ctx.arc(
        point.x + (Math.random() - 0.5) * gutter,
        point.y + (Math.random() - 0.5) * gutter,
        point.size,
        0,
        Math.PI * 2,
        true
      );
    } else {
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2, true);
    }
    ctx.closePath();
    ctx.fill();
  }

  /**
   * @msg: 将圆点慢慢移向文字的相关位置
   * @param {type}
   * @return: void
   */
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
        const angle = Math.atan2(Y, X);
        // 设置圆点新值
        point.x = point.px + Math.cos(angle) * T * Math.abs(point.deltaX);
        point.y = point.py + Math.sin(angle) * T * Math.abs(point.deltaY);
        // 用新值代替起始位置
        point.px = point.x;
        point.py = point.y;
        // 是否是文字的组成
        point.inText = true;
        // 画出该点
        this.drawPoint(point);
      } catch (e) {
        //console.log(e);
      }
      count--;
    }
  }

  /**
   * @msg: 以鼠标为中心，吸引小圆点
   * @param {type}
   * @return:
   */
  explode() {
    const {
      particles,
      mouse,
      width,
      height,
      consume,
      constant,
      key: { shift }
    } = this.option;
    for (let i = 0, l = particles.length; i < l; i++) {
      const point = particles[i];

      if (point.inText) {
        let ax = mouse.x - point.px;
        let ay = mouse.y - point.py;
        let distance = Math.max(1, (ax * ax + ay * ay) / 64);
        let angle = Math.atan2(ay, ax);

        let C = Math.cos(angle);
        let S = Math.sin(angle);

        point.pVelocityX = applyConsume(point.pVelocityX, 1 - consume);
        point.pVelocityY = applyConsume(point.pVelocityY, 1 - consume);

        if (point.px < 2 * point.size) {
          point.pVelocityX = Math.abs(point.pVelocityX);
        }
        if (point.px > width - 2 * point.size) {
          point.pVelocityX = -Math.abs(point.pVelocityX);
        }
        if (point.py < 2 * point.size) {
          point.pVelocityY = Math.abs(point.pVelocityY);
        }
        if (point.py > height - 2 * point.size) {
          point.pVelocityY = -Math.abs(point.pVelocityY);
        }

        let polarity = 1;
        if (shift) {
          polarity = -polarity;
        }

        point.pVelocityX += (polarity * (constant * C)) / distance;
        point.pVelocityY += (polarity * (constant * S)) / distance;

        point.x = point.px + point.pVelocityX;
        point.y = point.py + point.pVelocityY;

        point.px = point.x;
        point.py = point.y;

        this.drawPoint(point);
      }
    }
  }

  resetExplode() {
    const { particles } = this.option;
    particles.forEach(point => {
      point.pVelocityX = point.velocityX;
      point.pVelocityY = point.velocityY;
      point.consume = 1;
    });
  }

  draw() {
    const { ctx, width, height, textSize, getText, press } = this.option;
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

    if (press) {
      this.explode();
    } else {
      this.particleText(imgData);
    }
  }

  set(option) {
    Object.keys(option).forEach(key => {
      if (typeof option[key] === 'object') {
        this.option[key] = {
          ...this.option[key],
          ...option[key]
        };
      } else {
        this.option[key] = option[key];
      }
    });
  }

  loop() {
    this.draw();
    this.timer = requestAnimationFrame(() => this.loop());
  }

  stop() {
    cancelAnimationFrame(this.timer);
  }
}
