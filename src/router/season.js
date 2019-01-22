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
      exact: false
    },
    {
      path: 'summer',
      component: Summer,
      exact: false
    },
    {
      path: 'autumn',
      component: Autumn,
      exact: false
    },
    {
      path: 'winter',
      component: Winter,
      exact: false
    }
  ]
};
