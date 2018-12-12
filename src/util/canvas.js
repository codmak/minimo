export function getFullImageData({ ctx, width, height }, draw) {
  ctx.clearRect(0, 0, width, height);
  draw && draw(ctx);
  const imgData = ctx.getImageData(0, 0, width, height);
  ctx.clearRect(0, 0, width, height);
  return imgData;
}
