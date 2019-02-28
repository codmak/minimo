export function changeColor(point, type, value) {
  point.color[type] =
    point.pColor[type] + (value - point.pColor[type]) * point.deltaC;
  point.pColor[type] = point.color[type];
}

export function createLoop(func) {
  let timer = -1;
  let status = 'stop';
  function loop() {
    func && func();
    timer = requestAnimationFrame(loop);
  }
  return {
    start() {
      status = 'start';
      loop();
    },
    stop() {
      status = 'stop';
      cancelAnimationFrame(timer);
    },
    getStatus() {
      return status;
    }
  };
}
