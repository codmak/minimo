import Load from '../routerPage/Load';
import Canvas from '../routerPage/Canvas';

export default {
  basePath: '/',
  defaultPath: 'load',
  children: [
    {
      path: 'load',
      component: Load,
      exact: false
    },
    {
      path: 'canvas',
      component: Canvas,
      exact: false
    }
  ]
};
