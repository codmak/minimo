import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { MainRoute } from '../router';
import Time from '../component/Canvas';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MainRoute />
        <Time />
      </div>
    );
  }
}

export default withRouter(App);
