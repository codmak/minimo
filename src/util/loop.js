export function createLoop(func) {
  let timer = -1;
  function loop() {
    func && func();
    timer = setTimeout(loop, 1000);
  }
  return {
    start: loop,
    stop() {
      cancelAnimationFrame(timer);
    }
  };
}
