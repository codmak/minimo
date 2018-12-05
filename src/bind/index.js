export * from './local'
export * from './router'

export default function (component, wraps = []) {
  return wraps.reverse().reduce((wrapComponent, wrap) => {
    return wrap(wrapComponent)
  }, component)
}
