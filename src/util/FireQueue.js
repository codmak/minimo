export default class FireQueue {
  constructor() {
    this.queue = [];
    this.isFire = false;
    this.callBack = () => {
      throw new Error('请为队列设置执行回调');
    };
    this.getInitValue = () => {
      throw new Error('请为队列设置获取初始值的函数');
    };
  }

  add(fnc) {
    this.queue.push(fnc);
  }

  setCallBack(fnc) {
    this.callBack = fnc;
  }

  setGetInit(fnc) {
    this.getInitValue = fnc;
  }

  fire(func) {
    this.queue.push(func);
    if (this.isFire) return;
    this.isFire = true;
    Promise.resolve().then(() => {
      this.isFire = false;
      this.callBack(this.reduce(this.getInitValue()));
      this.clear();
    });
  }

  reduce(init) {
    return this.queue.reduce((prev, fnc) => fnc(prev), init);
  }

  clear() {
    this.queue = [];
  }
}
