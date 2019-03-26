export function changeColor(point, type, value) {
  point.color[type] =
    point.pColor[type] + (value - point.pColor[type]) * point.deltaC;
  point.pColor[type] = point.color[type];
}

/**
 * @description    使用 requestAnimationFrame 反复执行一个函数
 * @param          {Function} func       需要执行的函数
 * @param          {Object}   context    执行上下文
 * @return         {{start(...args: Array<any>): void, stop(): void, getStatus(): 'start' | 'stop';}}
 */
export function createLoop(func, context = null) {
  let timer = -1;
  let status = 'stop';
  function loop(...args) {
    func && func.apply(context, args);
    timer = requestAnimationFrame(loop);
  }
  return {
    /**
     * @description    开始执行
     * @param          {Array<any>}    args     执行所需参数
     */
    start(...args) {
      status = 'start';
      loop(...args);
    },
    /**
     * @description    停止执行
     */
    stop() {
      status = 'stop';
      cancelAnimationFrame(timer);
    },
    /**
     * @description    获取当前执行的状态
     * @return         {'start' | 'stop'}
     */
    getStatus() {
      return status;
    }
  };
}
