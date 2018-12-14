/*
 * @Author: Aco
 * @Date: 2018-12-11 10:55:13
 * @LastEditors: Aco
 * @LastEditTime: 2018-12-14 15:05:20
 * @Description: 所有的情话都不如你
 */
const wantSayToYou = {
  before: [
    {
      text: ['READY?']
    },
    {
      text: ['READY!']
    }
  ],
  nesteastMusic: [
    {
      text: [
        '我喜欢吃芒果，芒果味的硬糖不行，',
        '芒果慕斯不行，芒果汁也不行。',
        '我喜欢你，像你的声音不行，',
        '像你的笑容不行，不是你不行。',
        '浩渺穹苍，你是唯一。'
      ],
      name: '这世界唯一的你'
    },
    {
      text: ['下辈子', '我们还会在一起么？', '上辈子', '你就问过这个问题了。'],
      name: 'Lucky'
    },
    {
      text: [
        '你来人间一趟，',
        '你要看看太阳，',
        '和喜欢的人一起走在街上，',
        '比如我。'
      ],
      name: '人间'
    },
    {
      text: [
        '你知道，',
        '我一直喜欢的人是谁吗？',
        '如果你不知道，',
        '请回头，',
        '看我写的第一个字。'
      ],
      name: "Romeo's Tune"
    },
    {
      text: [
        '我们将来的女儿',
        '小名就叫慢慢吧。',
        '慢慢长大，慢慢生活，',
        '慢慢恋爱，慢慢爱你。'
      ],
      name: '慢慢喜欢你'
    },
    {
      text: [
        '我的心脏，在一分钟内呢，',
        '会喊出70次的「我正活着」。',
        '但和你在一起时，',
        '会稍微加快脚步，',
        '喊出110次的「我爱你」。'
      ],
      name: '心拍数♯0822'
    },
    {
      text: ['我有个好小好小的梦想，', '才四个字。', '是什么？', '沿途有你。'],
      name: '特别的人'
    },
    {
      text: ['比起一见钟情', '我更喜欢情有独钟'],
      name: '我的名字'
    },
    {
      text: ['你是年少的欢喜，', '也是余生的甜蜜。'],
      name: '需要你'
    },
    {
      text: [
        '喜欢春天的花香、',
        '夏天的海浪、',
        '秋天的枫叶、',
        '冬天的飘雪',
        '和每一天的你。'
      ],
      name: '左边'
    }
  ]
};

export function getBeforeText() {
  return wantSayToYou.before;
}

export function getMusicText() {
  const arr = wantSayToYou.nesteastMusic;
  return arr.map(item => ({
    text: [...item.text, `--by ${item.name}`],
    textOption: item.textOption,
    particleSize: item.particleSize
  }));
}

export const colorList = [];
