import Page1 from "../container/Page1";
import Page2 from "../container/Page2";

export default {
  basePath: "/",
  defaultPath: "",
  children: [
    {
      path: "page1",
      component: Page1,
      exact: false
    },
    {
      path: "page2",
      component: Page2,
      exact: false
    }
  ]
};
