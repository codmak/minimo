import React from "react";
import {BrowserRouter, HashRouter} from "react-router-dom";
import init from "./init";
import main from "./main";

const MainRoute = () => init(main);

export {MainRoute};

export default function applyRouter(type) {
  const Route = type === 'browser' ? BrowserRouter : HashRouter;
  return (children) => {
    return (
      <Route>
        {children}
      </Route>
    );
  };
}
