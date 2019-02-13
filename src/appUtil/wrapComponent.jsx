export function wrapComponent(component, wraps = []) {
  return wraps.reverse().reduce((wrapComponent, wrap) => wrap(wrapComponent), component);
}
