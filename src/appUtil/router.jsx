import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';

export function initRouter(config) {
  return (
    <Switch>
      {
        config.children.map((route, index) => {
            let routeCopy = {
              ...route,
              path: config.basePath + route.path
            };
            return <Route {...routeCopy} key={index}/>;
          }
        )
      }
      {
        config.defaultPath ? <Redirect to={config.basePath + config.defaultPath}/> : null
      }
    </Switch>
  );
}

export function applyRouter(type) {
  const Route = type === 'browser' ? BrowserRouter : HashRouter;
  return children => {
    return <Route>{children}</Route>;
  };
}
