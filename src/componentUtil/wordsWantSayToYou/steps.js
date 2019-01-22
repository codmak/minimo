import { getBeforeText, getMusicText } from './data/say';
import { getTextColor } from './data/color';

const beforeText = getBeforeText();
const musicText = getMusicText();

function createBeforeText(item) {
  return paintings => {
    const color = getTextColor();
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
    const color = getTextColor();
    paintings.text.changeTextOption({
      array: item.text,
      color
    });
  };
}

export default [
  paintings => {
    paintings.time.changeParticleInfo({ size: 6 });
    paintings.time.changeTextOption({
      textSize: 170,
      center: true
    });
    paintings.text.changeTextOption({
      array: [],
      color: [],
      textSize: 100
    });
  },
  paintings => {
    paintings.time.changeParticleInfo({ size: 4 });
    paintings.time.changeTextOption({
      textSize: 70,
      center: false
    });
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['想跟你说', '最甜的情话', '--by ACO'],
      color: color,
      textSize: 120
    });
  },
  // ...beforeText.map(item => createBeforeText(item)),
  // ...musicText.map(item => createMusicText(item))
];
