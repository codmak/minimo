export const random = (max, min = 0, include = false) =>
  Math.floor(min + Math.random() * (max - min + (include ? 1 : 0)));
