import { getBeforeText, getMusicText, getPoemText, getAcoText } from './say';
import { getTextColor } from './color';

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

export const steps = [
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
      array: ['摘录于', '网易云热评'],
      color: color,
      textSize: 120
    });
  },
  ...musicText.map(createText),
  paintings => {
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['在诗中'],
      color: color,
      textSize: 120
    });
  },
  ...poemText.map(createText),
  paintings => {
    let color = getTextColor();
    paintings.text.changeTextOption({
      array: ['在心里'],
      color: color,
      textSize: 120
    });
  },
  ...acoText.map(createText)
];
