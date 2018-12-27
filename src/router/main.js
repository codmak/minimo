import Loading from '../routerPage/Loading';
import Canvas from '../routerPage/Canvas';

export default {
  basePath: '/',
  defaultPath: 'loading',
  children: [
    {
      path: 'loading',
      component: Loading,
      exact: false
    },
    {
      path: 'canvas',
      component: Canvas,
      exact: false
    }
  ]
};
