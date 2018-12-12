import { connect } from 'react-redux';
import Load from '../../routerPage/Load';

export default connect(
  () => ({}),
  dispatch => {
    return {
      changCanvasStyle: style => {
        dispatch({
          type: 'changeStyle',
          payload: {
            ...style
          }
        });
      }
    };
  }
)(Load);
