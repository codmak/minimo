export function changeColor(point, type, value) {
  point.color[type] =
    point.pColor[type] + (value - point.pColor[type]) * point.deltaC;
  point.pColor[type] = point.color[type];
}
