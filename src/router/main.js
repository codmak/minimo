import Page1 from "../container/LinkPage1";

export default {
  basePath: "/",
  defaultPath: "",
  children: [
    {
      path: "page1",
      component: Page1,
      exact: false
    }
  ]
};
