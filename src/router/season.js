import Spring from '../routerPage/Spring';

export default {
  basePath: '/season/',
  defaultPath: 'spring',
  children: [
    {
      path: 'spring',
      component: Spring,
      exact: false
    }
  ]
};
