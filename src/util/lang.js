/*
 * @Author: Aco
 * @LastEditors: Aco
 * @Description: 数值相关函数
 * @Date: 2019-02-13 15:16:56
 * @LastEditTime: 2019-03-26 13:01:47
 */

/**
 * @description  获取随机值
 * @param        {number} max               随机范围的最大值
 * @param        {number} min               随机范围的最小值，默认为 0
 * @param        {Object} option            配置对象
 * @param        {boolean} option.include   随机出的值是否包含最大值
 * @param        {boolean} option.decimal   随机出的值是带小数返回
 * @return       {number}       返回随机数
 */
export const random = (
  max,
  min = 0,
  { include = false, decimal = false } = {}
) => {
  let num = min + Math.random() * (max - min + (include ? 1 : 0));
  if (decimal) {
    return num;
  } else {
    return Math.floor(num);
  }
};
