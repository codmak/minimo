export function changeColor(point, type, value) {
  point.color[type] =
    point.pColor[type] + (value - point.pColor[type]) * point.deltaC;
  point.pColor[type] = point.color[type];
}

export function createLoop(func) {
  let timer = -1;
  function loop() {
    func && func();
    timer = requestAnimationFrame(loop);
  }
  return {
    start: loop,
    stop() {
      cancelAnimationFrame(timer);
    }
  };
}
