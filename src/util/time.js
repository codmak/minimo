/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 时间相关函数
 * @Date: 2018-12-12 15:11:25
 * @LastEditTime: 2019-03-27 13:18:21
 */
import dayjs from 'dayjs';

const startDate = dayjs('2018-08-25T22:00+08:00');

/**
 * @description    显示两位数字
 * @param          {number}    需要显示成两位的数字
 * @return         {string}
 */
export function pad(number) {
  return ('0' + number).substr(-2);
}

/**
 * @description    获取从 2018-08-25T22:00+08:00 到目前时间的距离
 * @return         {Array<string>}
 */
export function getTimeLong() {
  let nowDate = dayjs();
  let yearDiff = nowDate.diff(startDate, 'year');
  let monthDiff = nowDate.diff(startDate, 'month');
  let dayDiff = nowDate.diff(startDate, 'day');
  let hourDiff = nowDate.diff(startDate, 'hour');
  let minuteDiff = nowDate.diff(startDate, 'minute');
  let secondDiff = nowDate.diff(startDate, 'second');
  let lastMonthDay = nowDate
    .set('date', startDate.date())
    .set('hour', startDate.hour())
    .set('minute', startDate.minute())
    .set('second', startDate.second())
    .set('millisecond', startDate.millisecond());

  if (lastMonthDay > nowDate) {
    lastMonthDay = lastMonthDay.subtract(1, 'month');
  }

  return [
    yearDiff,
    pad(monthDiff - yearDiff * 12),
    pad(nowDate.diff(lastMonthDay, 'day')),
    pad(hourDiff - dayDiff * 24),
    pad(minuteDiff - hourDiff * 60),
    pad(secondDiff - minuteDiff * 60)
  ];
}
