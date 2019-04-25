import { random } from '../../../util';

const cakeColor = [
  '#c5d6c5',
  '#f68787',
  '#f8a978',
  '#ffcece',
  '#ffc1c8',
  '#8ed6ff',
  '#a7d7c5',
  '#f3f8ff',
  '#deecff',
  '#c6cfff',
  '#e8d3ff',
  '#f9989f',
  '#fccb8f',
  '#faf096',
  '#c5f8c8'
];

export const getColor = () => cakeColor[random(cakeColor.length)];
