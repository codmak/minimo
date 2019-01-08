import EventEmitter from 'events';

const event = new EventEmitter();

export const $on = (...args) => event.on(...args);
export const $emit = (...args) => event.emit(...args);
export const $off = (...args) => event.off(...args);
