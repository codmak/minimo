import Loading from '../routerPage/Loading';
import Canvas from '../routerPage/Canvas';
import Music from '../routerPage/Music';

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
    },
    {
      path: 'music',
      component: Music,
      exact: false
    }
  ]
};
