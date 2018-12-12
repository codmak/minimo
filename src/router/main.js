import Load from '../connent/routerPage/Load';

export default {
  basePath: '/',
  defaultPath: 'load',
  children: [
    {
      path: 'load',
      component: Load,
      exact: false
    }
  ]
};
