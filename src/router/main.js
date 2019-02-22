import Loading from '../routerPage/Loading';
import Season from '../routerPage/Season';

export default {
  basePath: '/',
  defaultPath: 'loading',
  children: [
    {
      path: 'loading',
      component: Loading,
      exact: true
    },
    {
      path: 'season',
      component: Season,
      exact: false
    }
  ]
};
