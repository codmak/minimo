import Spring from '../routerPage/Spring';
import Summer from '../routerPage/Summer';
import Autumn from '../routerPage/Autumn';
import Winter from '../routerPage/Winter';

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
    },
    {
      path: 'autumn',
      component: Autumn,
      exact: true
    },
    {
      path: 'winter',
      component: Winter,
      exact: true
    }
  ]
};
