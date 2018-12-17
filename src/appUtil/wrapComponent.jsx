export function wrapComponent(component, wraps = []) {
  return wraps.reverse().reduce((wrapComponent, wrap) => {
    return wrap(wrapComponent);
  }, component);
}
