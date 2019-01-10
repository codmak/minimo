/*
 * @Author: Aco
 * @Date: 2018-12-11 10:55:13
 * @LastEditors: Aco
 * @LastEditTime: 2019-01-10 11:31:01
 * @Description: 所有的情话都不如你
 */

export function getBeforeText() {
  return wantSayToYou.before;
}

export function getMusicText() {
  const arr = wantSayToYou.nesteastMusic;
  return arr.map(item => {
    let arr = [...item.text];
    if (item.name) {
      arr.push(`--by ${item.name}`);
    }
    return {
      text: arr,
      textOption: item.textOption,
      particleSize: item.particleSize
    };
  });
}

const wantSayToYou = {
  before: [
    {
      text: ['READY?']
    },
    {
      text: ['READY!']
    }
  ],
  after: [
    {
      text: ['从今以后', '只要你想', '只要我有']
    },
    {
      text: [
        '有人说',
        '爱情是所有的激情',
        '直到遇见了你',
        '才知道，爱情是',
        '柴米油盐酱醋茶的生活中',
        '都有你'
      ]
    },
    {
      text: ['当然', '所有的情话都不如你']
    }
  ],
  nesteastMusic: [
    {
      text: ['我喜欢吃芒果', '芒果味的硬糖不行']
    },
    {
      text: ['芒果慕斯不行', '芒果汁也不行']
    },
    {
      text: ['我喜欢你', '像你的声音不行']
    },
    {
      text: ['像你的笑容不行', '不是你不行']
    },
    {
      text: ['浩渺穹苍，你是唯一'],
      name: '这世界唯一的你'
    },
    {
      text: ['下辈子', '我们还会在一起么？']
    },
    {
      text: ['上辈子', '你就问过这个问题啦！'],
      name: 'Lucky'
    },
    {
      text: ['你来人间一趟', '你要看看太阳']
    },
    {
      text: ['和喜欢的人一起走在街上', '比如我'],
      name: '人间'
    },
    {
      text: ['你知道', '我喜欢的人是谁吗？', '如果你不知道']
    },
    {
      text: ['请回头', '看我写的第一个字'],
      name: "Romeo's Tune"
    },
    {
      text: ['我们将来的女儿', '小名就叫慢慢吧']
    },
    {
      text: ['慢慢长大，慢慢生活', '慢慢恋爱，慢慢爱你'],
      name: '慢慢喜欢你'
    },
    {
      text: ['我的心脏，在一分钟内呢', '会喊出70次的「我正活着」']
    },
    {
      text: ['但和你在一起时', '会稍微加快脚步']
    },
    {
      text: ['喊出110次的「我爱你」'],
      name: '心拍数♯0822'
    },
    {
      text: ['我有个好小好小的梦想', '才四个字', '沿途有你'],
      name: '特别的人'
    },
    {
      text: ['比起一见钟情', '我更喜欢情有独钟'],
      name: '我的名字'
    },
    {
      text: ['你是年少的欢喜', '也是余生的甜蜜'],
      name: '需要你'
    },
    {
      text: ['喜欢春天的花香', '夏天的海浪']
    },
    {
      text: ['秋天的枫叶', '冬天的飘雪']
    },
    {
      text: ['和每一天的你'],
      name: '左边'
    },
    {
      text: ['春夏秋冬', '你若在场', '就很美好'],
      name: '春夏秋冬'
    },
    {
      text: ['想你', '在日里、 在夜里', '在每一个恍惚的刹那里'],
      name: '借我'
    },
    {
      text: ['桃花浪漫，海棠明媚', '含笑天真，铃兰清丽']
    },
    {
      text: ['都似你，却不及你'],
      name: '爱我别走'
    },
    {
      text: ['希望我能成为你的小众喜好', '藏着欣喜不已']
    },
    {
      text: ['炫耀时格外骄傲'],
      name: '你不在'
    },
    {
      text: ['你就这样一路蹦蹦跳跳', '撒着小星星跑到我心里啦'],
      name: 'Heartbeat'
    }
  ],
  threeLine: [
    {
      text: ['子曰：三思而后行', '1...2...3...', '我喜欢你'],
      by: '三行情书'
    },
    {
      text: ['自从喜欢你', '我的PH', '总是小于7'],
      by: '三行情书'
    }
  ],
  code: [
    {
      text: [
        'do {',
        '  console.log("i love you"); year++;',
        '} while (year <= 10000)'
      ]
    },
    {
      text: [
        'console.log("i love you");',
        'for(let i=0; i < forever; i++)',
        '  console.log("i love you");'
      ]
    },
    {
      text: [
        'const I = {};',
        'I.lover = You;',
        'I.lover = Other;',
        '// Error Can not change I.lover'
      ]
    }
  ]
};
