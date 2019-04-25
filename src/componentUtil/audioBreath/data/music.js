import { random } from '../../../util';

export const musics = [
  'http://cdn.acohome.cn/Beautiful%20In%20White%20%28Demo%29%20-%20Westlife.mp3',
  'http://cdn.acohome.cn/%E7%8E%8B%E4%BB%A5%E5%A4%AA%20-%20%E7%9B%AE%E4%B8%8D%E8%BD%AC%E7%9D%9B.flac',
  'http://cdn.acohome.cn/%E7%8E%8B%E4%BB%A5%E5%A4%AA%20-%20%E7%9B%AE%E4%B8%8D%E8%BD%AC%E7%9D%9B.flac',
  'http://cdn.acohome.cn/%E5%B0%8F%E9%9D%92%E9%BE%99%20-%20Call%20Me.flac',
  'http://cdn.acohome.cn/%E7%9B%B8%E4%BE%9D%E4%B8%BA%E5%91%BD%20-%20%E9%99%88%E5%B0%8F%E6%98%A5.mp3'
];

export const getMusic = () => musics[random(musics.length)];
