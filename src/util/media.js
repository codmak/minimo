/**
 * @description    加载图片
 * @param          {string} src 图片 url
 * @param          {{(err: any, image: HTMLImageElement): void}}    cb  当图片加载成功或失败时执行的函数
 */
export const loadImage = (src, cb) => {
  let image = new Image();
  image.src = src;
  image.onload = () => {
    cb(null, image);
  };
  image.onerror = err => {
    cb(err, image);
  };
};

/**
 * @description    加载音频
 * @param          {string} src 音频 url
 * @param          {{(err: any, image: HTMLAudioElement): void}}    cb  当音频加载成功或失败时执行的函数
 */
export const loadAudio = (src, cb) => {
  let audio = new Audio();
  audio.src = src;
  audio.addEventListener('canplay', cb);
};
