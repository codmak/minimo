import React, {Component} from "react";
import {Row, Col} from "antd";
import "antd/dist/antd.css";
import {NavLink, withRouter} from "react-router-dom";

import {MainRoute} from "../router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row className="full">
          <Col span={4}>
            <ul>
              <li>
                <NavLink to="/page1">draft</NavLink>
              </li>
              <li>
                <NavLink to="/page2">test</NavLink>
              </li>
            </ul>
          </Col>
          <Col span={20}>
            <MainRoute/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(App);
