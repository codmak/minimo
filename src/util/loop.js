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
