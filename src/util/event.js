/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 对于 events 事件的包装
 * @Date: 2019-01-08 15:55:16
 * @LastEditTime: 2019-03-26 13:20:36
 */

import EventEmitter from 'events';

const event = new EventEmitter();

export const $on = (...args) => event.on(...args);
export const $emit = (...args) => event.emit(...args);
export const $off = (...args) => event.off(...args);
