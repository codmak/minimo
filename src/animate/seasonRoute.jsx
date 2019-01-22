import React, { PureComponent } from 'react';
import 'animate.css/animate.min.css';

export default function seasonAnimate(WrappedComponent, path) {
  return class extends PureComponent {
    constructor() {
      super();
      this.state = {
        didMount: false,
        willUnMount: false
      };
    }
    componentDidMount = () => {
      this.setState({
        didMount: true
      });
    };
    componentWillUnmount = () => {
      this.setState({
        willUnMount: true
      });
    };

    render = () => {
      const { didMount, willUnMount } = this.state;
      let className = '';
      if (didMount) {
        className = 'animated fadeInDown';
      }
      if (willUnMount) {
        className = 'animated fadeOutDown';
      }
      return <WrappedComponent className={className} />;
    };
  };
}
