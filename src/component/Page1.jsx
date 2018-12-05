import React, {Component} from 'react';

class Page1 extends Component {

  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    console.log(this.props);
    const {addTodo} = this.props;

    return (
      <div onClick={addTodo}>page1</div>
    );
  }

}

export default Page1;
