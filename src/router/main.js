import Load from "../routerPage/Load";

export default {
  basePath: "/",
  defaultPath: "load",
  children: [
    {
      path: "load",
      component: Load,
      exact: false
    }
  ]
};
