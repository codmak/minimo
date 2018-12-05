import {connect} from 'react-redux';
import {addTodo} from '../store/action';
import Page1 from '../component/Page1';

const stateToProps = state => ({
  todo: state.todo
});

const dispatchToProps = dispatch => ({
  addTodo: () => dispatch(addTodo())
});

export default connect(
  stateToProps,
  dispatchToProps
)(Page1);
