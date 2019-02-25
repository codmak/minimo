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
