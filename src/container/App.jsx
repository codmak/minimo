import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { MainRoute } from '../router';
import Time from '../component/Time';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MainRoute />
        <Time position={{ bottom: 10, right: 10 }} />
      </div>
    );
  }
}

export default withRouter(App);
