import { random } from '../../../util';

const textColor = [
  ['#00a8b5', '#774898', '#de4383'],
  ['#4f9da6', '#facf5a', '#ff5959'],
  ['#900c3f', '#ff5733', '#ffc300'],
  ['#070d59', '#5893d4', '#1f3c88'],
  ['#45b7b7', '#8b4c8c', '#f57665'],
  ['#6e3b3b', '#ac3f21', '#be6a15'],
  ['#fa86be', '#a275e3', '#00a8b5'],
  ['#facd49', '#f18fac', '#5d50c6'],
  ['#db2d43', '#127681', '#f7aa00'],
  ['#ff9234', '#ffcd3c', '#35d0ba'],
  ['#ffd615', '#ff1f5a', '#1e2a78'],
  ['#79b8d1', '#5c8d89', '#e36488'],
  ['#090089', '#3161a3', '#f05a28'],
  ['#ff8f56', '#ff5959', '#984a59'],
  ['#700961', '#e03e36', '#b80d57'],
  ['#00a8b5', '#774898', '#e62a76'],
  ['#f48fb1', '#f06292', '#880e4f'],
  ['#ffce3e', '#e65c7b', '#834496'],
  ['#cc0500', '#ef2f2a', '#efac2a']
];

const timeColor = [
  '#f18a9b',
  '#d34848',
  '#070d59',
  '#0c907d',
  '#26baee',
  '#fbd341',
  '#ff8364'
];

export const getTimeColor = () => timeColor[random(timeColor.length)];

export const getTextColor = () => textColor[random(textColor.length)];
