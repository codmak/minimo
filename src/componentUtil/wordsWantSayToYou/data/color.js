const textColor = [
  ['rgb(204,187,232)', 'rgb(254,207,243)', 'rgb(163,235,250)'],
  ['rgb(157,210,231)', 'rgb(255,236,217)', 'rgb(222,164,163)'],
  ['rgb(153,222,204)', 'rgb(255,226,227)', 'rgb(188,216,224)'],
  ['rgb(164,91,93)', 'rgb(220,117,72)', 'rgb(254,199,200)']
];

const timeColor = [
  '#aeecf8',
  '#dca3c9',
  '#dc6a77',
  '#f1a0bb',
  '#f5b8cf',
  '#e3e9d8',
  '#c5d6c5'
];

const random = (max, min = 0) => Math.floor(min + Math.random() * max);

export const getTimeColor = () => timeColor[random(timeColor.length)];

export const getTextColor = () => textColor[random(textColor.length)];
