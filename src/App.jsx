import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {MainRoute} from './router';

class App extends Component {
  render() {
    return (
      <div className="app">
        <MainRoute/>
      </div>
    );
  }
}

export default withRouter(App);
