import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

export default function init(config) {
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
        config.defaultPath ? <Redirect to='/'/> : null
      }
    </Switch>
  );
}
