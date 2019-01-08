export default class Circle {
  constructor(radius) {
    this.radius = radius;

    this.color = {
      r: 255,
      g: 255,
      b: 255,
      a: 0.6
    };
    this.pColor = {
      ...this.color
    };
    this.deltaC = 0.05;

    this.show = false;

    this.angle = 0;
  }
}
