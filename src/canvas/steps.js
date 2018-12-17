import { getBeforeText, getMusicText } from '../data/say';
import colors from '../data/color';

const beforeText = getBeforeText();
const musicText = getMusicText();

const getColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

function createBeforeText(item) {
  return paintings => {
    const color = getColor();
    paintings.time.changeTextOption({
      color: color[0]
    });
    paintings.text.changeTextOption({
      array: item.text,
      color: color
    });
  };
}

function createMusicText(item) {
  return paintings => {
    const color = getColor();
    paintings.time.changeTextOption({
      color: color[0]
    });
    paintings.text.changeParticleInfo({ size: 4 });
    paintings.text.resetParticlePositon();
    paintings.text.changeTextOption({
      array: item.text,
      color,
      textSize: 70,
      gutter: 3
    });
  };
}

const color = ['rgb(157,210,231)', 'rgb(255,236,217)', 'rgb(222,164,163)'];

export default [
  paintings => {
    paintings.time.changeParticleInfo({ size: 6 });
    paintings.time.changeTextOption({
      textSize: 170,
      color: 'rgb(42,35,75)',
      center: true
    });
  },
  paintings => {
    paintings.time.changeParticleInfo({ size: 4 });
    paintings.time.changeTextOption({
      textSize: 70,
      color: color[0],
      center: false
    });
    paintings.text.changeTextOption({
      array: ['给你', '最甜的情话', '--by ACO'],
      color: color,
      textSize: 100
    });
  },
  ...beforeText.map(item => createBeforeText(item)),
  ...musicText.map(item => createMusicText(item))
];
