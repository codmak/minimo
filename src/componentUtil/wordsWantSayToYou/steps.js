import {
  getBeforeText,
  getMusicText,
  getPoemText,
  getAcoText
} from './data/say';
import { getTextColor } from './data/color';

const beforeText = getBeforeText();
const musicText = getMusicText();
const poemText = getPoemText();
const acoText = getAcoText();

function createText(item) {
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
      textSize: 150,
      center: true
    });
    paintings.text.changeTextOption({
      array: [],
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
      array: ['和你说', '最甜的情话', '--by aco'],
      color: color,
      textSize: 100
    });
  },
  ...beforeText.map(createText),
  paintings => {
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['情话', '散落在网易云里'],
      color: color,
      textSize: 120
    });
  },
  ...musicText.map(createText),
  paintings => {
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['情话', '隐藏在诗中'],
      color: color,
      textSize: 120
    });
  },
  ...poemText.map(createText),
  paintings => {
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['情话', '在心中'],
      color: color,
      textSize: 120
    });
  },
  ...acoText.map(createText)
];
