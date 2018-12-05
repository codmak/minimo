export * from './local'

export default function (component, wraps = []) {
  return wraps.reverse().reduce((wrapComponent, wrap) => {
    return wrap(wrapComponent)
  }, component)
}
