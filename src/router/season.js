import Spring from '../routerPage/Spring';
import Summer from '../routerPage/Summer';

export default {
  basePath: '/season/',
  defaultPath: 'spring',
  children: [
    {
      path: 'spring',
      component: Spring,
      exact: true
    },
    {
      path: 'summer',
      component: Summer,
      exact: true
    }
  ]
};
